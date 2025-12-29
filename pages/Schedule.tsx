import React from 'react';
import { Box, Flex, Text, Heading, VStack, HStack, Button } from '@chakra-ui/react';
import { Calendar, Flag } from 'lucide-react';

const schedule = [
  { id: 1, title: 'Math', time: '8:00 AM - 9:45 AM', color: '#CFFAFE' },
  { id: 2, title: 'English', time: '9:00 AM - 9:45 AM', color: '#FEF3C7' },
  { id: 3, title: 'Biology', time: '10:00 AM - 10:45 AM', color: '#EEF2FF' },
  { id: 4, title: 'Physics', time: '11:00 AM - 11:45 AM', color: '#FCE7F3' },
  { id: 5, title: 'Chemistry', time: '1:00 PM - 1:45 PM', color: '#CFFAFE' },
  { id: 6, title: 'History', time: '2:00 PM - 2:45 PM', color: '#FEF3C7' },
];

const events = [
  { id: 'e1', title: 'Summer Camp Trip', time: '12:00PM - 3:00PM' },
  { id: 'e2', title: 'Music Concert', time: '2:00PM - 3:30PM' },
  { id: 'e3', title: 'Science Fair', time: '11:00AM - 1:00PM' },
];

const Schedule: React.FC = () => {
  return (
    <Box p={{ base: 4, lg: 8 }} maxW="1600px" mx="auto" className="space-y-6">
      <Heading size="md" mb={4}>Class Schedule</Heading>

      <Flex gap={6}>
        {/* Main schedule column */}
        <Box flex={3} bg="#fff" rounded="24px" p={6} border="1px" borderColor="gray.100" boxShadow="sm">
          <VStack align="stretch" spacing={4}>
            {schedule.map((s) => (
              <Flex key={s.id} align="center" justify="space-between" p={4} rounded="lg" style={{ background: s.color }}>
                <Box>
                  <Text fontWeight="bold" color="#0f172a">{s.title}</Text>
                  <Text fontSize="sm" color="#475569">{s.time}</Text>
                </Box>
                <Button size="sm" variant="ghost" colorScheme="blue">View</Button>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Right sidebar */}
        <Box flex={1} className="space-y-4">
          <Box bg="#fff" rounded="24px" p={4} border="1px" borderColor="gray.100" boxShadow="sm">
            <HStack justify="space-between" mb={3}>
              <Text fontWeight="bold">Calendar</Text>
              <Calendar size={16} className="text-gray-400" />
            </HStack>
            <Text fontSize="sm" color="#94a3b8">Aug 2024</Text>
            <Box mt={4} className="text-sm text-gray-400">{/* Placeholder calendar */}
              <div className="grid grid-cols-7 gap-1 text-xs mt-2">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="h-8 flex items-center justify-center rounded-md bg-transparent text-gray-400">{i + 1}</div>
                ))}
              </div>
            </Box>
          </Box>

          <Box bg="#fff" rounded="24px" p={4} border="1px" borderColor="gray.100" boxShadow="sm">
            <HStack justify="space-between" mb={3}>
              <Text fontWeight="bold">Events</Text>
              <Flag size={16} className="text-gray-400" />
            </HStack>
            <VStack align="stretch" spacing={3}>
              {events.map((e) => (
                <Box key={e.id} p={3} rounded="lg" bg="#f8fafc" border="1px" borderColor="gray.50">
                  <Text fontWeight="bold" fontSize="sm">{e.title}</Text>
                  <Text fontSize="xs" color="#94a3b8">{e.time}</Text>
                </Box>
              ))}
            </VStack>
          </Box>

          <Box bg="#fff" rounded="24px" p={4} border="1px" borderColor="gray.100" boxShadow="sm">
            <Text fontWeight="bold" mb={2}>Announcements</Text>
            <Text fontSize="sm" color="#64748b">Field trip rescheduled to next week. Check your course page for details.</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Schedule;
