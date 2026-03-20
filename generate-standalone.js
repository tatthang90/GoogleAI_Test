const fs = require('fs');
const path = require('path');

function generate() {
    console.log('Generating standalone HTML...');

    const dataContent = fs.readFileSync(path.join(__dirname, 'src/data.ts'), 'utf8')
        .replace(/import .*/g, '')
        .replace(/export /g, '');

    const appContent = fs.readFileSync(path.join(__dirname, 'src/App.tsx'), 'utf8')
        .replace(/import .*/g, '')
        .replace(/export default /g, 'const App = ')
        .replace(/export /g, '');

    const cssContent = fs.readFileSync(path.join(__dirname, 'src/index.css'), 'utf8');

    const htmlTemplate = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VIB Project Portal - Standalone</title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <!-- React & ReactDOM -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Babel for JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <!-- Framer Motion -->
    <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>
    
    <!-- Lodash -->
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>

    <style>
        ${cssContent.replace(/@import "tailwindcss";/g, '').replace(/@theme \{[\s\S]*?\}/g, '').replace(/@apply/g, '/* @apply */')}
        
        /* Custom Tailwind Config Emulation */
        :root {
            --vib-blue: #3D6B35;
            --vib-blue-dark: #2D4F27;
            --vib-orange: #CD7F32;
            --nature-mist: #F7FAF7;
            --nature-moss: #4A6B6E;
            --nature-moss-dark: #2C3E40;
        }
        
        .bg-vib-blue { background-color: var(--vib-blue); }
        .bg-vib-orange { background-color: var(--vib-orange); }
        .bg-nature-mist { background-color: var(--nature-mist); }
        .bg-nature-moss { background-color: var(--nature-moss); }
        .bg-nature-moss-dark { background-color: var(--nature-moss-dark); }
        .text-vib-blue { color: var(--vib-blue); }
        .border-vib-blue { border-color: var(--vib-blue); }
        
        body {
            font-family: 'Be Vietnam Pro', sans-serif;
            background-color: #FDFCF0;
        }

        .raci-vertical-text {
            writing-mode: vertical-lr;
            transform: rotate(180deg);
        }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef, useCallback } = React;
        const { motion, AnimatePresence } = FramerMotion;
        const { cloneDeep, set } = _;
        
        // Mock Lucide components for standalone
        const LucideIcon = ({ name, size = 24, className = "" }) => {
            useEffect(() => {
                lucide.createIcons();
            }, [name]);
            return <i data-lucide={name} style={{ width: size, height: size }} className={className}></i>;
        };

        // Map Lucide icons used in App
        const Users = (props) => <LucideIcon name="users" {...props} />;
        const LayoutGrid = (props) => <LucideIcon name="layout-grid" {...props} />;
        const RefreshCw = (props) => <LucideIcon name="refresh-cw" {...props} />;
        const ClipboardList = (props) => <LucideIcon name="clipboard-list" {...props} />;
        const Settings = (props) => <LucideIcon name="settings" {...props} />;
        const MapIcon = (props) => <LucideIcon name="map" {...props} />;
        const ChevronRight = (props) => <LucideIcon name="chevron-right" {...props} />;
        const AlertCircle = (props) => <LucideIcon name="alert-circle" {...props} />;
        const CheckCircle2 = (props) => <LucideIcon name="check-circle-2" {...props} />;
        const Clock = (props) => <LucideIcon name="clock" {...props} />;
        const UserCircle2 = (props) => <LucideIcon name="user-circle-2" {...props} />;
        const Database = (props) => <LucideIcon name="database" {...props} />;
        const ShieldCheck = (props) => <LucideIcon name="shield-check" {...props} />;
        const Zap = (props) => <LucideIcon name="zap" {...props} />;
        const Edit2 = (props) => <LucideIcon name="edit-2" {...props} />;
        const Save = (props) => <LucideIcon name="save" {...props} />;
        const X = (props) => <LucideIcon name="x" {...props} />;
        const Plus = (props) => <LucideIcon name="plus" {...props} />;
        const Trash2 = (props) => <LucideIcon name="trash-2" {...props} />;

        // Data from data.ts
        ${dataContent}

        // App Component from App.tsx
        ${appContent}

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
    `;

    fs.writeFileSync(path.join(__dirname, 'VIB_Project_Portal_Standalone.html'), htmlTemplate);
    console.log('Standalone HTML generated: VIB_Project_Portal_Standalone.html');
}

generate();
