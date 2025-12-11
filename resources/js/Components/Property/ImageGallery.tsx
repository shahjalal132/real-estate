import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ExtendedPropertyImage {
    id: number | string;
    url: string;
    position: number;
    is_thumbnail: boolean;
    isPlaceholder?: boolean;
}

interface ImageGalleryProps {
    images: ExtendedPropertyImage[];
    isOpen: boolean;
    initialIndex: number;
    onClose: () => void;
    getImageUrl: (index: number) => string;
    propertyName: string;
}

export default function ImageGallery({
    images,
    isOpen,
    initialIndex,
    onClose,
    getImageUrl,
    propertyName,
}: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const nextImage = useCallback(() => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, [images.length]);

    const prevImage = useCallback(() => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                prevImage();
            } else if (e.key === "ArrowRight") {
                nextImage();
            } else if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, currentIndex, images.length, onClose, nextImage, prevImage]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[101] bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
                aria-label="Close gallery"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-[101] bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-colors"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-[101] bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-colors"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Main Image */}
            <div className="relative max-w-7xl max-h-[90vh] mx-4">
                <img
                    src={getImageUrl(currentIndex)}
                    alt={`${propertyName} - Image ${currentIndex + 1}`}
                    className="max-w-full max-h-[90vh] object-contain"
                />
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-6 py-2 text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 overflow-x-auto max-w-4xl px-4">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                index === currentIndex
                                    ? "border-[#0066CC] ring-2 ring-[#0066CC] ring-offset-2"
                                    : "border-transparent hover:border-white/50 opacity-70 hover:opacity-100"
                            }`}
                        >
                            <img
                                src={getImageUrl(index)}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
