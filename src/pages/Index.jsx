import React, { useState, useEffect } from "react";
import { Container, VStack, Button, Input, useToast, Table, Thead, Tbody, Tr, Th, Td, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const API_URL = "https://script.google.com/macros/s/AKfycbzOURGfpPDgS0kNzOATJUzKzYQ-I0Lv87bgEBaDbDvgeaZwIUT1gHbinHoYCtMmHHoe/exec";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editNote, setEditNote] = useState("");
  const [editId, setEditId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "GET",
          sheet: "notes",
        }),
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      toast({
        title: "Error fetching notes",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const addNote = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "POST",
          sheet: "notes",
          payload: { note: newNote },
        }),
      });
      fetchNotes();
      setNewNote("");
      toast({
        title: "Note added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error adding note",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "DELETE",
          sheet: "notes",
          id: id,
        }),
      });
      fetchNotes();
      toast({
        title: "Note deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting note",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const openEditModal = (id, note) => {
    setEditId(id);
    setEditNote(note);
    onOpen();
  };

  const updateNote = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "PUT",
          sheet: "notes",
          id: editId,
          payload: { note: editNote },
        }),
      });
      fetchNotes();
      onClose();
      toast({
        title: "Note updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating note",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4}>
        <Input placeholder="Add new note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNote}>
          Add Note
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Note</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notes.map((note) => (
              <Tr key={note.id}>
                <Td>{note.note}</Td>
                <Td>
                  <IconButton icon={<FaEdit />} onClick={() => openEditModal(note.id, note.note)} m={1} />
                  <IconButton icon={<FaTrash />} onClick={() => deleteNote(note.id)} m={1} colorScheme="red" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Edit note" value={editNote} onChange={(e) => setEditNote(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateNote}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
