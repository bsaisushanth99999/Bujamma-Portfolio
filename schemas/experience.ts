export interface Experiences extends SanityBody {
    map(arg0: (tempData: any) => JSX.Element): import("react").ReactNode;
    _type:"experience";
    company: string;
    companyImage: Image;
    dateStarted: Date;
    dateEnded: Date;
    isCurrentlyWorkingHere: boolean;
    jobTitle: string;
    points:string[];
    technology:Technology[];
}

interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string
}

interface Image {
    _typr: "image";
    asset: {
        _ref: string;
        _type: "refrence";
    };
}

export interface Technology extends SanityBody {
    _type:"skill";
    image: Image;
    progress: number;
    title: string;
}