"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation';

const SidebarNavigation = () => {
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home", icon: "🏠" },
        { href: "/about", label: "About", icon: "👩‍⚕️" },
        { href: "/education", label: "Education", icon: "🎓" },
        // { href: "/experience", label: "Experience", icon: "🏢" },
        { href: "/projects", label: "Projects", icon: "📋" },
        { href: "/workshops", label: "Workshops", icon: "🏗️" },
        { href: "/certifications", label: "Certifications", icon: "📜" },
        { href: "/skills", label: "Skills", icon: "🛠️" },
        { href: "/hobbies", label: "Hobbies", icon: "🎨" },
        { href: "/languages", label: "Languages", icon: "🌐" },
        { href: "/resume", label: "Resume", icon: "📄" },
        { href: "/contact", label: "Contact", icon: "📞" },
    ];

    return (
        <nav
            className={`sidebar-nav ${isHovered ? "expanded" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="nav-content">
                {links.map(({ href, label, icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`nav-item ${pathname === href ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{icon}</span>
                        <span className="nav-label">{label}</span>
                        {pathname === href && <span className="nav-active-indicator" />}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default SidebarNavigation;
