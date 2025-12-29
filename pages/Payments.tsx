
import React, { useMemo, useState } from 'react';
import {
  Box, Flex, Text, Button, Input, IconButton, HStack,
  Table, Thead, Tbody, Tr, Th, Td, Checkbox, Badge, Spacer,
  useToast, Menu, MenuButton, MenuList, MenuItem, Tag, Select,
  useBreakpointValue, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from '@chakra-ui/react';
import { Search, Filter, FileText, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

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

const PaymentDetailModal: React.FC<{ isOpen: boolean; onClose: () => void; payment?: Payment | null }> = ({ isOpen, onClose, payment }) => {
  const toast = useToast();
  if (!payment) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Payment details — {payment.transactionId}</ModalHeader>
        <ModalBody>
          <Stack spacing={3}>
            <Text><strong>From:</strong> {payment.from}</Text>
            <Text><strong>Payment for:</strong> {payment.paymentFor}</Text>
            <Text><strong>Amount:</strong> {payment.amount}</Text>
            <Text><strong>Method:</strong> {payment.method}</Text>
            <Text><strong>Date:</strong> {payment.date}</Text>
            <Text><strong>Status:</strong> {payment.status}</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => { navigator.clipboard?.writeText(payment.transactionId); toast({ title: 'Copied transaction id', status: 'success' }); }}>
            Copy ID
          </Button>
          <Button colorScheme="blue" onClick={() => { toast({ title: 'Receipt exported', status: 'success' }); }}>Export receipt</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Payments: React.FC = () => {
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // Pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
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

            <Menu>
              <MenuButton as={IconButton} aria-label="Filter" icon={<Filter size={16} />} size="sm" />
              <MenuList>
                <MenuItem>
                  <Text fontWeight="bold">Status</Text>
                </MenuItem>
                <MenuItem onClick={() => { setStatusFilter('all'); setPage(1); }}>All</MenuItem>
                <MenuItem onClick={() => { setStatusFilter('Succeeded'); setPage(1); }}>Succeeded</MenuItem>
                <MenuItem onClick={() => { setStatusFilter('Pending'); setPage(1); }}>Pending</MenuItem>
                <MenuItem onClick={() => { setStatusFilter('Declined'); setPage(1); }}>Declined</MenuItem>
                <MenuItem divider />
                <MenuItem>
                  <Text fontWeight="bold">Method</Text>
                </MenuItem>
                <MenuItem onClick={() => { setMethodFilter('all'); setPage(1); }}>All</MenuItem>
                <MenuItem onClick={() => { setMethodFilter('VISA'); setPage(1); }}>VISA</MenuItem>
                <MenuItem onClick={() => { setMethodFilter('Mastercard'); setPage(1); }}>Mastercard</MenuItem>
                <MenuItem onClick={() => { setMethodFilter('Bank transfer'); setPage(1); }}>Bank transfer</MenuItem>
              </MenuList>
            </Menu>

            <IconButton aria-label="Export" icon={<FileText size={16} />} size="sm" onClick={downloadCSV} />
          </HStack>
        </Flex>

        {/* Table for md+ */}
        {showTable ? (
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead bg="gray.50">
                <Tr>
                  <Th><Checkbox isChecked={paged.length > 0 && Object.keys(selected).length === paged.length} onChange={(e) => toggleSelectAll(e.target.checked)} /></Th>
                  <Th>Transaction Id</Th>
                  <Th>Payment from</Th>
                  <Th>Payment for</Th>
                  <Th>Amount</Th>
                  <Th>Payment method</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paged.map(p => (
                  <Tr key={p.id} _hover={{ bg: 'gray.50' }}>
                    <Td><Checkbox isChecked={!!selected[p.id]} onChange={(e) => setSelected(s => ({ ...s, [p.id]: e.target.checked }))} /></Td>
                    <Td fontSize="sm" whiteSpace="nowrap">{p.transactionId}</Td>
                    <Td>{p.from}</Td>
                    <Td>{p.paymentFor}</Td>
                    <Td>{p.amount}</Td>
                    <Td><Tag size="sm" variant="subtle">{p.method}</Tag></Td>
                    <Td>{p.date}</Td>
                    <Td>
                      {p.status === 'Succeeded' && <Badge colorScheme="green">Succeeded</Badge>}
                      {p.status === 'Pending' && <Badge colorScheme="yellow">Pending</Badge>}
                      {p.status === 'Declined' && <Badge colorScheme="red">Declined</Badge>}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ) : (
          /* Mobile card list */
          <Stack spacing={3}>
            {paged.map(p => (
              <Box key={p.id} p={3} rounded="12px" border="1px" borderColor="gray.50" _hover={{ bg: 'gray.50' }}>
                <Flex align="center">
                  <Checkbox isChecked={!!selected[p.id]} onChange={(e) => setSelected(s => ({ ...s, [p.id]: e.target.checked }))} mr={3} />
                  <Box flex={1}>
                    <Text fontSize="sm" fontWeight="bold">{p.paymentFor}</Text>
                    <Text fontSize="xs" color="gray.500">{p.transactionId} • {p.from}</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontWeight="bold">{p.amount}</Text>
                    <Text fontSize="xs"><Tag size="xs">{p.method}</Tag></Text>
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

      <PaymentDetailModal isOpen={isOpen} onClose={onClose} payment={activePayment} />
    </Box>
  );
};

export default Payments;
