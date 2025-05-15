interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string
}

interface Image {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
}

export interface PageInfo extends SanityBody {
    _type: "pageInfo";
    address: string;
    backgroundInformation: string;
    email: string;
    role: string;
    heroImage: Image;
    name: string;
    phoneNumber: string;
    profilePic: Image;
}

export interface Skill extends SanityBody {
    _type: "skill";
    image: Image;
    progress: number;
    title: string;
    type: string;
}

export interface SanityImage {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
}

export interface Certification {
    name: string;
    pdfImage: SanityImage;
    pdfDocument?: {
        _type: "file";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
}

export interface CertificationsData {
    title: string;
    certificationsList: Certification[];
}

export interface Workshop {
    _id: string;
    title: string;
    image: SanityImage;
    summary: string;
    pdfDocument?: {
        _type: "file";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
}
