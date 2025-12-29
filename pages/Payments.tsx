
import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { Settings } from 'lucide-react';

const Payments: React.FC = () => {
  return (
    <Flex align="center" justify="center" minH="600px" p={{ base: 4, lg: 8 }}>
      <Box bg="white" p={8} rounded="24px" border="1px" borderColor="gray.100" boxShadow="sm" textAlign="center">
        <Settings size={48} className="mb-4 text-gray-400" />
        <Text fontSize="xl" fontWeight="bold" mb={2}>Payments & Billing — Under construction</Text>
        <Text color="gray.500" mb={6}>This section is currently being redesigned. We'll update it once the design is ready.</Text>
        <Button onClick={() => window.location.href = '/courses'}>Go to Courses</Button>
      </Box>
    </Flex>
  );
};

export default Payments;
