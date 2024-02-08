/* Importation des hooks nécessaires depuis React. On a de useState pour 
//gérer l'état des notes, de useEffect pour écouter les changements dans le localStorage.*/
import { useState, useEffect } from "react";

// Importation du composant Modal depuis la librairie react-modal
import Modal from "react-modal";

// Importation des composants personnalisés depuis les fichiers correspondants
import MarkdownInput from "./components/MarkdownInput";
import NoteDisplay from "./components/NoteDisplay";
import NoteList from "./components/NoteList";

// Configuration de l'élément racine pour le modal (nécessaire pour l'accessibilité)
Modal.setAppElement("#root");

// Définition du type Note pour TypeScript
type Note = {
  id: number; // Identifiant unique de la note
  title: string; // Titre de la note
  content: string; // Contenu de la note
};

// Définition du composant App
const App = () => {
  // Utilisation du hook useState pour gérer l'état des notes
  // Initialisation avec les notes stockées dans le localStorage
  const [notes, setNotes] = useState<Note[]>(
    () => JSON.parse(localStorage.getItem("notes") || "[]")
  );

  // Utilisation du hook useState pour gérer l'état de la note active
  // Initialisation à null (aucune note active au départ)
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  // Utilisation du hook useState pour gérer l'état d'ouverture du modal
  // Initialisation à false (modal fermé au départ)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Utilisation du hook useEffect pour écouter les changements dans le localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      // Mise à jour de l'état des notes lorsque le localStorage change
      setNotes(JSON.parse(localStorage.getItem("notes") || "[]"));
    };

    // Ajout de l'écouteur d'événement au chargement du composant
    window.addEventListener("storage", handleStorageChange);

    // Suppression de l'écouteur d'événement lors du démontage du composant
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Fonction pour créer une nouvelle note
  const handleNewNote = () => {
    // Création d'une nouvelle note avec un id unique (timestamp actuel)
    const newNote: Note = { id: Date.now(), title: "", content: "" };

    // Mise à jour de la note active avec la nouvelle note
    setActiveNote(newNote);

    // Ouverture du modal
    setIsModalOpen(true);
  };

  const handleNoteSelect = (note: Note) => {
    setActiveNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (note: Note) => {
    setNotes((prevNotes: Note[]) => {
      let updatedNotes: Note[] = [];
      const existingNote = prevNotes.find((n) => n.id === note.id);
      if (existingNote) {
        updatedNotes = prevNotes.map((n) => (n.id === note.id ? note : n));
      } else {
        updatedNotes = [note, ...prevNotes];
      }
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

// Fonction pour supprimer une note
const handleDeleteNote = (noteToDelete: Note) => {
  // Mise à jour de l'état des notes en supprimant la note à supprimer
  setNotes((prevNotes: Note[]) => {
    const updatedNotes = prevNotes.filter((note) => note.id !== noteToDelete.id);

    // Mise à jour du localStorage avec les notes mises à jour
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    return updatedNotes;
  });

  // Si la note active est celle qu'on supprime, on réinitialise la note active
  if (activeNote && activeNote.id === noteToDelete.id) {
    setActiveNote(null);
  }
};

  return (
    <div>
      <button onClick={handleNewNote}>New Note</button>
      <NoteList
        notes={notes}
        activeNote={activeNote}
        onNoteSelect={handleNoteSelect}
        onDeleteNote={handleDeleteNote}
        className="space-y-2"
      />
      <NoteDisplay note={activeNote} />
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <MarkdownInput
          note={activeNote}
          onNoteChange={setActiveNote}
          onSaveNote={handleSaveNote}
        />
      </Modal>
    </div>
  );
};

export default App;

/* Pour expliquer succintement ce code,
 - Nous avons une liste de notes stockées dans le state de l'application.
  - Lorsqu'une note est sélectionnée, elle est affichée dans un composant Modal.
  - Lorsqu'une note est modifiée, elle est sauvegardée dans le localStorage.
  - Lorsqu'une note est supprimée, elle est retirée de la liste de notes.
  - Lorsqu'une nouvelle note est créée, elle est ajoutée à la liste de notes.
  - Lorsque la page est rechargée, les notes sont chargées à partir du localStorage.
  - Lorsque le localStorage est modifié, les notes sont mises à jour.
  - Lorsque le bouton "New Note" est cliqué, une nouvelle note est créée.
  - Depuis le modal, l'utilisateur peut éditer le titre et le contenu de la note.
  - Lorsque le bouton "Save" est cliqué, la note est sauvegardée.
  - Lorsque le bouton "X" est cliqué, la note est supprimée.
  - Lorsqu'une note est sélectionnée, elle est mise en surbrillance dans la liste de notes.
  - Lorsqu'une note est sélectionnée, elle est affichée dans le composant NoteDisplay.
  - Lorsqu'une note est sélectionnée, le modal est ouvert. Pour l'editer, IMPORTANT: 
  si tu clics en dehors du modal, le contenu édité sera sauvegardé, et le modal se fermera.
  */ 
