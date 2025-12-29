
import React, { useMemo, useRef, useState } from 'react';
import {
  Box, Flex, Text, Button, Input, IconButton, HStack, Image,
  Table, Checkbox, Badge, Spacer,
  useToast, Tag, Select, useBreakpointValue, Stack, useOutsideClick
} from '@chakra-ui/react';
import { Search, Filter, FileText, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';

type Payment = {
  id: string;
  transactionId: string;
  from: string;
  paymentFor: string;
  amount: string;
  method: string;
  date: string;
  status: 'Succeeded' | 'Pending' | 'Declined';
};

const createSample = (n = 20) => Array.from({ length: n }).map((_, i) => ({
  id: String(i + 1),
  transactionId: `TX-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
  from: 'Grace Hopkins',
  paymentFor: i % 3 === 0 ? 'Course registration' : (i % 3 === 1 ? 'School fees' : 'Departmental dues'),
  amount: i % 3 === 0 ? '₦230,000' : (i % 3 === 1 ? '₦340,000' : '₦45,000'),
  method: i % 4 === 0 ? 'Bank transfer' : (i % 3 === 0 ? 'Mastercard' : 'VISA'),
  date: `23-08-2025`,
  status: i % 5 === 0 ? 'Pending' : (i % 4 === 0 ? 'Declined' : 'Succeeded') as Payment['status'],
}));

const sampleData = createSample(37);

// Map payment method string -> asset image (defaults chosen by request)
const getMethodIcon = (method: string) => {
  // Mapping: 1) dbe6fcea... -> VISA
  //          2) 10b571fd... -> Mastercard
  //          3) 3b543946... -> Bank transfer
  if (/VISA/i.test(method)) return '/assets/dbe6fcea94b57473b3ac92ebfd373581c53ffdf8 (2).png';
  if (/Mastercard/i.test(method) || /Mastercard/i.test(method)) return '/assets/10b571fd0d881b731c970262e0cc1b5bfad7c107 (1).png';
  if (/Bank/i.test(method) || /transfer/i.test(method)) return '/assets/3b543946b234ab5b1742eccf85f0c75277b92ddd (1).png';
  // Fallback: try matching common tokens
  if (/master/i.test(method)) return '/assets/10b571fd0d881b731c970262e0cc1b5bfad7c107 (1).png';
  if (/visa/i.test(method)) return '/assets/dbe6fcea94b57473b3ac92ebfd373581c53ffdf8 (2).png';
  return '/assets/3b543946b234ab5b1742eccf85f0c75277b92ddd (1).png';
};

const PaymentDetailModal: React.FC<{ isOpen: boolean; onClose: () => void; payment?: Payment | null }> = ({ isOpen, onClose, payment }) => {
  const toast = useToast();
  if (!payment || !isOpen) return null;
  return (
    <Box position="fixed" inset={0} zIndex={70} display="flex" alignItems="center" justifyContent="center">
      <Box position="absolute" inset={0} bg="blackAlpha.600" onClick={onClose} />
      <Box bg="white" p={6} rounded="12px" shadow="lg" zIndex={80} minW={{ base: '90%', md: '640px' }}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontWeight="bold">Payment details — {payment.transactionId}</Text>
          <IconButton aria-label="Close" icon={<X size={16} />} variant="ghost" onClick={onClose} />
        </Flex>

        <Stack spacing={3}>
          <Text><strong>From:</strong> {payment.from}</Text>
          <Text><strong>Payment for:</strong> {payment.paymentFor}</Text>
          <Text><strong>Amount:</strong> {payment.amount}</Text>
          <Text><strong>Method:</strong> <HStack display="inline-flex" spacing={2} align="center"><Image src={getMethodIcon(payment.method)} alt={payment.method} boxSize="16px" objectFit="contain" /><span>{payment.method}</span></HStack></Text>
          <Text><strong>Date:</strong> {payment.date}</Text>
          <Text><strong>Status:</strong> {payment.status}</Text>
        </Stack>

        <Flex mt={5} justify="flex-end" gap={3}>
          <Button variant="ghost" onClick={() => { navigator.clipboard?.writeText(payment.transactionId); toast({ title: 'Copied transaction id', status: 'success' }); }}>Copy ID</Button>
          <Button colorScheme="blue" onClick={() => { toast({ title: 'Receipt exported', status: 'success' }); }}>Export receipt</Button>
        </Flex>
      </Box>
    </Box>
  );
};

const Payments: React.FC = () => {
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({ ref: filterRef, handler: () => setShowFilters(false) });

  // Pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Modal (local state; using custom modal implementation)
  const [modalOpen, setModalOpen] = useState(false);
  const [activePayment, setActivePayment] = useState<Payment | null>(null);

  const showTable = useBreakpointValue({ base: false, md: true });

  const filtered = useMemo(() => {
    return sampleData.filter(p => {
      const q = query.trim().toLowerCase();
      if (q) {
        const inText = p.from.toLowerCase().includes(q) || p.transactionId.toLowerCase().includes(q) || p.paymentFor.toLowerCase().includes(q);
        if (!inText) return false;
      }
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (methodFilter !== 'all' && p.method !== methodFilter) return false;
      return true;
    });
  }, [query, statusFilter, methodFilter]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = Math.min((page - 1) * perPage + 1, total || 0);
  const end = Math.min(page * perPage, total);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSel: Record<string, boolean> = {};
      paged.forEach(p => newSel[p.id] = true);
      setSelected(newSel);
    } else {
      setSelected({});
    }
  };

  const downloadCSV = () => {
    if (filtered.length === 0) { toast({ title: 'No rows to export', status: 'warning' }); return; }
    const header = ['Transaction ID', 'From', 'Payment For', 'Amount', 'Method', 'Date', 'Status'];
    const rows = filtered.map(r => [r.transactionId, r.from, r.paymentFor, r.amount, r.method, r.date, r.status]);
    const csv = [header, ...rows].map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'payments.csv'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <Box p={{ base: 4, lg: 8 }}>
      <Flex align="center" mb={6} gap={4}>
        <Text fontSize={{ base: 'lg', lg: 'xl' }} fontWeight="bold">Payments</Text>
        <Spacer />
        <Button leftIcon={<Plus size={14} />} colorScheme="blue">Make New Payment</Button>
      </Flex>

      <Box bg="white" p={{ base: 3, lg: 6 }} rounded="16px" border="1px" borderColor="gray.100">
        <Flex align="center" mb={4}>
          <Text fontSize="md" fontWeight="bold">Recent Payments</Text>
          <Spacer />
          <HStack spacing={3}>
            <Input placeholder="Search by name, email or code" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} bg="gray.50" size="sm" maxW={{ base: '160px', md: '360px' }} />

            {/* Custom filter dropdown (avoids MenuButton export mismatch) */}
            <Box position="relative" ref={filterRef}>
              <IconButton aria-label="Filter" icon={<Filter size={16} />} size="sm" onClick={() => setShowFilters(s => !s)} />
              {showFilters && (
                <Box position="absolute" right={0} mt={2} w="220px" bg="white" border="1px" borderColor="gray.100" rounded="8px" shadow="sm" zIndex={60} p={2}>
                  <Text fontWeight="bold" px={3} py={1}>Status</Text>
                  <Button variant="ghost" justifyContent="flex-start" w="full" onClick={() => { setStatusFilter('all'); setPage(1); setShowFilters(false); }}>All</Button>
                  <Button variant="ghost" justifyContent="flex-start" w="full" onClick={() => { setStatusFilter('Succeeded'); setPage(1); setShowFilters(false); }}>Succeeded</Button>
                  <Button variant="ghost" justifyContent="flex-start" w="full" onClick={() => { setStatusFilter('Pending'); setPage(1); setShowFilters(false); }}>Pending</Button>
                  <Button variant="ghost" justifyContent="flex-start" w="full" onClick={() => { setStatusFilter('Declined'); setPage(1); setShowFilters(false); }}>Declined</Button>

                  <Box my={2} borderTop="1px" borderColor="gray.50" />
                  <Text fontWeight="bold" px={3} py={1}>Method</Text>
                  <Button variant="ghost" justifyContent="flex-start" w="full" onClick={() => { setMethodFilter('all'); setPage(1); setShowFilters(false); }}>All</Button>
                  <Button variant="ghost" justifyContent="flex-start" w="full" onClick={() => { setMethodFilter('VISA'); setPage(1); setShowFilters(false); }}>VISA</Button>
                  <Button variant="ghost" justifyContent="flex-start" w="full" onClick={() => { setMethodFilter('Mastercard'); setPage(1); setShowFilters(false); }}>Mastercard</Button>
                  <Button variant="ghost" justifyContent="flex-start" w="full" onClick={() => { setMethodFilter('Bank transfer'); setPage(1); setShowFilters(false); }}>Bank transfer</Button>
                </Box>
              )}
            </Box>

            <IconButton aria-label="Export" icon={<FileText size={16} />} size="sm" onClick={downloadCSV} />
          </HStack>
        </Flex>

        {/* Table for md+ */}
        {showTable ? (
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <thead style={{ backgroundColor: '#F8FAFC' }}>
                <tr>
                  <th style={{ padding: '10px' }}><Checkbox isChecked={paged.length > 0 && Object.keys(selected).length === paged.length} onChange={(e) => toggleSelectAll(e.target.checked)} /></th>
                  <th style={{ padding: '10px' }}>Transaction Id</th>
                  <th style={{ padding: '10px' }}>Payment from</th>
                  <th style={{ padding: '10px' }}>Payment for</th>
                  <th style={{ padding: '10px' }}>Amount</th>
                  <th style={{ padding: '10px' }}>Payment method</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {paged.map(p => (
                  <tr key={p.id} onClick={() => { setActivePayment(p); setModalOpen(true); }} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
                    <td style={{ padding: '12px' }}><Checkbox isChecked={!!selected[p.id]} onClick={(e) => e.stopPropagation()} onChange={(e) => setSelected(s => ({ ...s, [p.id]: e.target.checked }))} /></td>
                    <td style={{ padding: '12px', fontSize: 14, whiteSpace: 'nowrap' }}>{p.transactionId}</td>
                    <td style={{ padding: '12px' }}>{p.from}</td>
                    <td style={{ padding: '12px' }}>{p.paymentFor}</td>
                    <td style={{ padding: '12px' }}>{p.amount}</td>
                    <td style={{ padding: '12px' }}>
                      <HStack spacing={2} align="center">
                        <Image src={getMethodIcon(p.method)} alt={p.method} boxSize="18px" objectFit="contain" />
                        <Tag size="sm" variant="subtle">{p.method}</Tag>
                      </HStack>
                    </td>
                    <td style={{ padding: '12px' }}>{p.date}</td>
                    <td style={{ padding: '12px' }}>
                      {p.status === 'Succeeded' && <Badge colorScheme="green">Succeeded</Badge>}
                      {p.status === 'Pending' && <Badge colorScheme="yellow">Pending</Badge>}
                      {p.status === 'Declined' && <Badge colorScheme="red">Declined</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        ) : (
          /* Mobile card list */
          <Stack spacing={3}>
            {paged.map(p => (
              <Box key={p.id} p={3} rounded="12px" border="1px" borderColor="gray.50" _hover={{ bg: 'gray.50' }} onClick={() => { setActivePayment(p); setModalOpen(true); }} style={{ cursor: 'pointer' }}>
                <Flex align="center">
                  <Checkbox isChecked={!!selected[p.id]} onClick={(e) => e.stopPropagation()} onChange={(e) => setSelected(s => ({ ...s, [p.id]: e.target.checked }))} mr={3} />
                  <Box flex={1}>
                    <Text fontSize="sm" fontWeight="bold">{p.paymentFor}</Text>
                    <Text fontSize="xs" color="gray.500">{p.transactionId} • {p.from}</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontWeight="bold">{p.amount}</Text>
                    <Text fontSize="xs">
                      <HStack spacing={2} align="center">
                        <Image src={getMethodIcon(p.method)} alt={p.method} boxSize="14px" objectFit="contain" />
                        <Tag size="xs">{p.method}</Tag>
                      </HStack>
                    </Text>
                    <Box mt={1}>{p.status === 'Succeeded' ? <Badge colorScheme="green">Succeeded</Badge> : (p.status === 'Pending' ? <Badge colorScheme="yellow">Pending</Badge> : <Badge colorScheme="red">Declined</Badge>)}</Box>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Stack>
        )}

        {/* Empty state */}
        {total === 0 && (
          <Flex align="center" justify="center" p={8} color="gray.500">No payments found</Flex>
        )}

        {/* Pagination controls */}
        <Flex align="center" justify="space-between" mt={4}>
          <Text fontSize="sm" color="gray.600">Showing {total === 0 ? 0 : start} - {end} of {total}</Text>

          <HStack spacing={2}>
            <IconButton aria-label="Prev" size="sm" icon={<ChevronLeft size={14} />} onClick={() => setPage(p => Math.max(1, p - 1))} isDisabled={page === 1} />
            <IconButton aria-label="Next" size="sm" icon={<ChevronRight size={14} />} onClick={() => setPage(p => Math.min(pages, p + 1))} isDisabled={page === pages} />
            <Select size="sm" maxW="100px" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
            </Select>
          </HStack>
        </Flex>
      </Box>

      <PaymentDetailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} payment={activePayment} />
    </Box>
  );
};

export default Payments;
