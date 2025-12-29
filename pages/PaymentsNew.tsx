import React from 'react';
import { Box, Flex, Text, Button, Stack, Tag, useToast } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const useQuery = () => new URLSearchParams(useLocation().search);

const PaymentsNew: React.FC = () => {
  const query = useQuery();
  const type = query.get('type') || 'other';
  const navigate = useNavigate();
  const toast = useToast();

  const labelMap: Record<string, string> = {
    registration: 'Pay for Course Registration',
    transcript: 'Pay for Transcript',
    other: 'Make Other Payments',
  };

  const label = labelMap[type] ?? labelMap.other;

  return (
    <Box p={{ base: 4, lg: 8 }}>
      <Flex align="center" justify="space-between" mb={6}>
        <Text fontSize="xl" fontWeight="bold">{label}</Text>
        <Button variant="ghost" onClick={() => navigate('/payments')}>Back to payments</Button>
      </Flex>

      <Box bg="white" p={6} rounded="16px" border="1px" borderColor="gray.100">
        <Stack spacing={4}>
          <Text color="gray.600">This is a placeholder payment flow for <Tag>{label}</Tag>. Implement the real form or payment integration here.</Text>

          <Button colorScheme="blue" onClick={() => { toast({ title: 'Payment flow started', status: 'success' }); navigate('/payments'); }}>Start Payment</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default PaymentsNew;
