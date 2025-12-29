
import React, { useMemo, useState } from 'react';
import {
  Box, Flex, Text, Button, Input, IconButton, HStack, Stack,
  Table, Thead, Tbody, Tr, Th, Td, Checkbox, Badge, Select, Spacer,
  useToast, Menu, MenuButton, MenuList, MenuItem, Tag
} from '@chakra-ui/react';
import { Search, Filter, FileText, Plus } from 'lucide-react';

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

const sampleData: Payment[] = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  transactionId: `TX-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
  from: 'Grace Hopkins',
  paymentFor: i % 3 === 0 ? 'Course registration' : (i % 3 === 1 ? 'School fees' : 'Departmental dues'),
  amount: i % 3 === 0 ? '₦230,000' : (i % 3 === 1 ? '₦340,000' : '₦45,000'),
  method: i % 4 === 0 ? 'Bank transfer' : (i % 3 === 0 ? 'Mastercard' : 'VISA'),
  date: '23-08-2025',
  status: i % 5 === 0 ? 'Pending' : (i % 4 === 0 ? 'Declined' : 'Succeeded') as Payment['status'],
}));

const Payments: React.FC = () => {
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Record<string, boolean>>({});

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

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSel: Record<string, boolean> = {};
      filtered.forEach(p => newSel[p.id] = true);
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
        <Text fontSize="xl" fontWeight="bold">Payments</Text>
        <Spacer />
        <HStack spacing={3}>
          <Input placeholder="Search by name, email or code" value={query} onChange={(e) => setQuery(e.target.value)} bg="white" maxW="360px" />

          <Menu>
            <MenuButton as={IconButton} aria-label="Filter" icon={<Filter size={16} />} />
            <MenuList>
              <MenuItem>
                <Text fontWeight="bold">Status</Text>
              </MenuItem>
              <MenuItem onClick={() => setStatusFilter('all')}>All</MenuItem>
              <MenuItem onClick={() => setStatusFilter('Succeeded')}>Succeeded</MenuItem>
              <MenuItem onClick={() => setStatusFilter('Pending')}>Pending</MenuItem>
              <MenuItem onClick={() => setStatusFilter('Declined')}>Declined</MenuItem>
              <MenuItem divider />
              <MenuItem>
                <Text fontWeight="bold">Method</Text>
              </MenuItem>
              <MenuItem onClick={() => setMethodFilter('all')}>All</MenuItem>
              <MenuItem onClick={() => setMethodFilter('VISA')}>VISA</MenuItem>
              <MenuItem onClick={() => setMethodFilter('Mastercard')}>Mastercard</MenuItem>
              <MenuItem onClick={() => setMethodFilter('Bank transfer')}>Bank transfer</MenuItem>
            </MenuList>
          </Menu>

          <IconButton aria-label="Export" icon={<FileText size={16} />} onClick={downloadCSV} />

          <Button leftIcon={<Plus size={14} />} colorScheme="blue">Make New Payment</Button>
        </HStack>
      </Flex>

      <Box bg="white" p={{ base: 3, lg: 6 }} rounded="16px" border="1px" borderColor="gray.100" overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead bg="gray.50">
            <Tr>
              <Th><Checkbox isChecked={filtered.length > 0 && Object.keys(selected).length === filtered.length} onChange={(e) => toggleSelectAll(e.target.checked)} /></Th>
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
            {filtered.map(p => (
              <Tr key={p.id} _hover={{ bg: 'gray.50' }}>
                <Td><Checkbox isChecked={!!selected[p.id]} onChange={(e) => setSelected(s => ({ ...s, [p.id]: e.target.checked }))} /></Td>
                <Td fontSize="sm" whiteSpace="nowrap">{p.transactionId}</Td>
                <Td>{p.from}</Td>
                <Td>{p.paymentFor}</Td>
                <Td>{p.amount}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Tag size="sm" variant="subtle">{p.method}</Tag>
                  </HStack>
                </Td>
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

        {filtered.length === 0 && (
          <Flex align="center" justify="center" p={8} color="gray.500">No payments found</Flex>
        )}
      </Box>

    </Box>
  );
};

export default Payments;
