import React from "react";
import { FileText, Image as ImageIcon, Download, MoreVertical, File } from "lucide-react";

export default function FilesView() {
    // Mock files data
    const files = [
        { id: 1, name: "Project_Requirements.pdf", size: "2.4 MB", date: "Jul 28, 2025", type: "pdf" },
        { id: 2, name: "Office_Layout.jpg", size: "4.1 MB", date: "Jul 29, 2025", type: "image" },
        { id: 3, name: "Budget_2025.xlsx", size: "1.2 MB", date: "Aug 02, 2025", type: "spreadsheet" },
        { id: 4, name: "Brand_Assets.zip", size: "15.4 MB", date: "Aug 05, 2025", type: "archive" },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="text-red-500" />;
            case 'image': return <ImageIcon className="text-blue-500" />;
            default: return <File className="text-gray-500" />;
        }
    };

    return (
        <div className= "p-6" >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
            {/* Upload Card */ }
            < div className = "aspect-[4/3] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors group" >
                <div className="bg-gray-100 p-3 rounded-full mb-3 group-hover:bg-gray-200" >
                    <FileText size={ 24 } className = "text-gray-400 group-hover:text-gray-500" />
                        </div>
                        < span className = "text-sm font-medium text-gray-600" > Upload File </span>
                            </div>

    {/* File Cards */ }
    {
        files.map(file => (
            <div key= { file.id } className = "aspect-[4/3] bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative group" >
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" >
        <button className="p-1 hover:bg-gray-100 rounded text-gray-500" >
        <MoreVertical size={ 16} />
        </button>
        </div>

        < div className = "flex items-center justify-center flex-1" >
        { getIcon(file.type)
    }
    </div>

        < div className = "mt-3" >
            <div className="text-sm font-medium text-gray-800 truncate" title = { file.name } > { file.name } </div>
                < div className = "flex items-center justify-between mt-1 text-xs text-gray-500" >
                    <span>{ file.size } </span>
                    < span > { file.date } </span>
                    </div>
                    </div>
                    </div>
                ))
}
</div>
    </div>
    );
}
