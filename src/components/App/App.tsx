import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { getPhotos } from "../../services/photos";
import { useState, type CSSProperties } from "react";
import type { Photo } from "../../types/photo";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";

export default function App() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const color = "#ffffff";
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  async function handleSearch(query: string) {
    try {
      setIsError(false);
      setPhotos([]);
      setIsLoading(true);
      const response = await getPhotos(query);
      if (response.length === 0) {
        toast.error("No photos found for your request.");
        return;
      }
      setPhotos(response);
    } catch {
      setIsError(true);
      return;
    } finally {
      setIsLoading(false);
    }
  }
  function openModal(photo: Photo) {
    setIsModalOpen(true);
    setPhoto(photo);
  }
  function closeModal() {
    setIsModalOpen(false);
    setPhoto(null)
  }

  return (
    <>
      <Section>
        <Container>
          <Toaster position="top-center" reverseOrder={false} />
          <Form onSubmit={handleSearch} />
          {isLoading && (
            <Loader color={color} override={override} loading={isLoading} />
          )}
          {isError && <Text children={"Ooops, something went wrong"} />}
          <PhotosGallery onClick={openModal} photos={photos} />
          {photo && <Modal onClose={closeModal} photo={photo} />}
        </Container>
      </Section>
    </>
  );
}
