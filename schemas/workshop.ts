export interface Workshop extends SanityBody {
    _type: "workshops";
    title: string;
    image: {
        _type: "image";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
    summary: string;
    pdfDocument?: {
        _type: "file";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
}

interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
} 