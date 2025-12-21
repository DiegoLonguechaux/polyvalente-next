"use client";

import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EventFormProps {
  initialData?: {
    _id?: string;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl?: string;
    images?: string[];
  };
}

export default function EventForm({ initialData }: EventFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      if (initialData.images && initialData.images.length > 0) {
        setExistingImages(initialData.images);
      } else if (initialData.imageUrl) {
        setExistingImages([initialData.imageUrl]);
      }
    }
  }, [initialData]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData ? {
      ...initialData,
      date: new Date(initialData.date).toISOString().slice(0, 16)
    } : {
      title: "",
      description: "",
      date: "",
      location: "",
    },
  });

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
      let uploadedUrls: string[] = [];

      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Erreur lors de l'upload des images");
        }

        const uploadData = await uploadRes.json();
        uploadedUrls = uploadData.urls;
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      const payload = {
        ...data,
        images: finalImages,
        imageUrl: finalImages.length > 0 ? finalImages[0] : "", // Keep legacy field updated
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          {...register("title", { required: "Le titre est requis" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register("description", { required: "La description est requise" })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date et Heure</label>
        <input
          type="datetime-local"
          {...register("date", { required: "La date est requise" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lieu</label>
        <input
          {...register("location", { required: "Le lieu est requis" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
        />
        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Photos (Max 16)</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 16 photos)</p>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {existingImages.map((url, index) => (
            <div key={`existing-${index}`} className="relative group aspect-square">
              <img
                src={url}
                alt={`Existing ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeExistingImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {previews.map((url, index) => (
            <div key={`preview-${index}`} className="relative group aspect-square">
              <img
                src={url}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-300"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
