export interface Workshop {
    _type: "workshop";
    _id: string;
    title: string;
    summary: string;
    image: {
        _type: "image";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
    pdfDocument: {
        _type: "file";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
}

export interface Skill {
    _type: "skill";
    title: string;
    progress: number;
    image: {
        _type: "image";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
}

export interface CertificationsData {
    _type: "certifications";
    title: string;
    certificationsList: Array<{
        _type: "certification";
        name: string;
        pdfDocument: {
            _type: "file";
            asset: {
                _ref: string;
                _type: "reference";
            };
        };
        pdfImage: {
            _type: "image";
            asset: {
                _ref: string;
                _type: "reference";
            };
        };
    }>;
}

export interface PageInfo {
    _type: "pageInfo";
    name: string;
    role: string;
    heroImage: {
        _type: "image";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
    backgroundInformation: string;
    profilePic: {
        _type: "image";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
    phoneNumber: string;
    email: string;
    address: string;
    socials: Array<{
        _type: "reference";
        _ref: string;
    }>;
}

export interface Resume {
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
    summary?: string;
} 