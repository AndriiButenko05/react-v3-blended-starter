import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  onClick: (photo: Photo) => void;
  photos: Photo[];
}

export default function PhotosGallery({ onClick, photos }: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => {
        return (
          <PhotosGalleryItem
            photo={photo}
            onClick={() => onClick(photo)}
            key={photo.id}
          />
        );
      })}
    </Grid>
  );
}
