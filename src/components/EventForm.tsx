"use client";

import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EventFormProps {
  initialData?: {
    _id?: string;
    title: string;
    subtitle?: string;
    description: string;
    date: string;
    location: string;
    category?: string;
    imageUrl?: string;
    images?: string[];
    coverImage?: string;
    artistImage?: string;
    artistWebsite?: string;
    facebookLink?: string;
    instagramLink?: string;
    artistNote?: string;
  };
}

export default function EventForm({ initialData }: EventFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  
  // Gallery Files
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Cover Image
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [existingCoverImage, setExistingCoverImage] = useState<string | null>(null);

  // Artist Image
  const [artistFile, setArtistFile] = useState<File | null>(null);
  const [artistPreview, setArtistPreview] = useState<string | null>(null);
  const [existingArtistImage, setExistingArtistImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      if (initialData.images && initialData.images.length > 0) {
        setExistingImages(initialData.images);
      } else if (initialData.imageUrl) {
        setExistingImages([initialData.imageUrl]);
      }

      if (initialData.coverImage) setExistingCoverImage(initialData.coverImage);
      if (initialData.artistImage) setExistingArtistImage(initialData.artistImage);
    }
  }, [initialData]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData ? {
      ...initialData,
      date: new Date(initialData.date).toISOString().slice(0, 16),
      category: initialData.category || "Autre",
      subtitle: initialData.subtitle || "",
      artistWebsite: initialData.artistWebsite || "",
      facebookLink: initialData.facebookLink || "",
      instagramLink: initialData.instagramLink || "",
      artistNote: initialData.artistNote || "",
    } : {
      title: "",
      subtitle: "",
      description: "",
      date: "",
      location: "",
      category: "Autre",
      artistWebsite: "",
      facebookLink: "",
      instagramLink: "",
      artistNote: "",
    },
  });

  // Handle Gallery Files
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Limit to 16 images total (existing + new)
      const totalImages = existingImages.length + files.length + newFiles.length;
      if (totalImages > 16) {
        setError("Vous ne pouvez pas ajouter plus de 16 images au total.");
        return;
      }

      setFiles((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Handle Cover Image
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // Handle Artist Image
  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArtistFile(file);
      setArtistPreview(URL.createObjectURL(file));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      return newPreviews.filter((_, i) => i !== index);
    });
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    setError("");
    try {
      // Upload Gallery Images
      let uploadedUrls: string[] = [];
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("Erreur lors de l'upload des images de la galerie");
        const uploadData = await uploadRes.json();
        uploadedUrls = uploadData.urls;
      }

      // Upload Cover Image
      let coverImageUrl = existingCoverImage;
      if (coverFile) {
        const formData = new FormData();
        formData.append("files", coverFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("Erreur lors de l'upload de la photo de couverture");
        const uploadData = await uploadRes.json();
        coverImageUrl = uploadData.urls[0];
      }

      // Upload Artist Image
      let artistImageUrl = existingArtistImage;
      if (artistFile) {
        const formData = new FormData();
        formData.append("files", artistFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("Erreur lors de l'upload de la photo de l'artiste");
        const uploadData = await uploadRes.json();
        artistImageUrl = uploadData.urls[0];
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      const payload = {
        ...data,
        images: finalImages,
        imageUrl: finalImages.length > 0 ? finalImages[0] : "", // Keep legacy field updated
        coverImage: coverImageUrl,
        artistImage: artistImageUrl,
      };

      const url = initialData?._id 
        ? `/api/events/${initialData._id}` 
        : "/api/events";
      
      const method = initialData?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Une erreur est survenue lors de la sauvegarde");
      }

      router.push("/admin/events");
      router.refresh();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 bg-primary-400 p-8 rounded-xl border border-gray-800">
      {error && (
        <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Section: Informations Générales */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-secondary uppercase tracking-wider border-l-4 border-secondary pl-4">
          Informations Générales
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Titre de l'évènement</label>
            <input
              {...register("title", { required: "Le titre est requis" })}
              className="w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary p-3 border transition-colors"
              placeholder="Ex: Concert de Jazz"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message as string}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Sous-titre (Optionnel)</label>
            <input
              {...register("subtitle")}
              className="w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary p-3 border transition-colors"
              placeholder="Ex: Une soirée inoubliable"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Date et Heure</label>
            <input
              type="datetime-local"
              {...register("date", { required: "La date est requise" })}
              className="w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary p-3 border transition-colors"
            />
            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message as string}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Catégorie</label>
            <select
              {...register("category", { required: "La catégorie est requise" })}
              className="w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary p-3 border transition-colors"
            >
              <option value="Concert">Concert</option>
              <option value="Théâtre">Théâtre</option>
              <option value="Humour">Humour</option>
              <option value="Atelier">Atelier</option>
              <option value="Autre">Autre</option>
            </select>
            {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message as string}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Lieu</label>
            <input
              {...register("location", { required: "Le lieu est requis" })}
              className="w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary p-3 border transition-colors"
              placeholder="Ex: Salle Polyvalente"
            />
            {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location.message as string}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Description</label>
            <textarea
              {...register("description", { required: "La description est requise" })}
              rows={8}
              className="w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary p-3 border transition-colors"
              placeholder="Description détaillée de l'évènement..."
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message as string}</p>}
          </div>
        </div>
      </div>

      {/* Section: Médias */}
      <div className="space-y-6 pt-6 border-t border-gray-800">
        <h3 className="text-xl font-bold text-secondary uppercase tracking-wider border-l-4 border-secondary pl-4">
          Médias
        </h3>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Photo de couverture</label>
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-primary-500 hover:bg-primary-200 transition-colors group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-4 text-gray-500 group-hover:text-secondary transition-colors" />
                  <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-secondary">Cliquez pour uploader</span> ou glissez-déposez</p>
                  <p className="text-xs text-gray-500">PNG, JPG (Recommandé: 1920x1080)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleCoverChange}
                />
              </label>
            </div>
            {(coverPreview || existingCoverImage) && (
              <div className="relative w-40 h-40 shrink-0">
                <img
                  src={coverPreview || existingCoverImage || ""}
                  alt="Cover Preview"
                  className="w-full h-full object-cover rounded-lg border border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCoverFile(null);
                    setCoverPreview(null);
                    setExistingCoverImage(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Galerie Photos (Max 16)</label>
          <div className="flex items-center justify-center w-full mb-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-primary-500 hover:bg-primary-200 transition-colors group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-500 group-hover:text-secondary transition-colors" />
                <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-secondary">Ajouter des photos</span> à la galerie</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                multiple 
                accept="image/*"
                onChange={handleFileChange}
                disabled={existingImages.length + files.length >= 16}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {existingImages.map((url, index) => (
              <div key={`existing-${index}`} className="relative group aspect-square">
                <img
                  src={url}
                  alt={`Existing ${index}`}
                  className="w-full h-full object-cover rounded-lg border border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {previews.map((url, index) => (
              <div key={`preview-${index}`} className="relative group aspect-square">
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover rounded-lg border border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section: Artiste */}
      <div className="space-y-6 pt-6 border-t border-gray-800">
        <h3 className="text-xl font-bold text-secondary uppercase tracking-wider border-l-4 border-secondary pl-4">
          Informations Artiste
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Photo de l'artiste</label>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-primary-500 hover:bg-primary-200 transition-colors group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-500 group-hover:text-secondary transition-colors" />
                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-secondary">Photo portrait</span></p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleArtistChange}
                  />
                </label>
              </div>
              {(artistPreview || existingArtistImage) && (
                <div className="relative w-32 h-40 shrink-0">
                  <img
                    src={artistPreview || existingArtistImage || ""}
                    alt="Artist Preview"
                    className="w-full h-full object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setArtistFile(null);
                      setArtistPreview(null);
                      setExistingArtistImage(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Site Internet</label>
              <input
                {...register("artistWebsite")}
                placeholder="https://..."
                className="w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary p-3 border transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Facebook</label>
              <input
                {...register("facebookLink")}
                placeholder="https://facebook.com/..."
                className="w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary p-3 border transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Instagram</label>
              <input
                {...register("instagramLink")}
                placeholder="https://instagram.com/..."
                className="w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary p-3 border transition-colors"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Le petit mot de l'artiste</label>
            <textarea
              {...register("artistNote")}
              rows={3}
              className="w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary p-3 border transition-colors"
              placeholder="Un message personnel de l'artiste..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-8 border-t border-gray-800 gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors uppercase tracking-wide font-bold text-sm"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer bg-secondary text-primary font-bold px-8 py-3 rounded-lg hover:bg-secondary-200 disabled:opacity-50 transition-colors uppercase tracking-widest text-sm shadow-lg"
        >
          {isSubmitting ? "Enregistrement..." : "Enregistrer l'évènement"}
        </button>
      </div>
    </form>
  );
}
