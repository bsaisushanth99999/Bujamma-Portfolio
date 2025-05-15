export interface Resume extends SanityBody {
    _type: "resume";
    pdfDocument: {
        _type: "file";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
    photo: {
        _type: "image";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
    summary: string;
}

interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
} 