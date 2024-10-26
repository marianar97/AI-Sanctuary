import React from "react";
import Tag from "./Tag";

export default function VideoCardContent({title, channel, duration, tags}) {
    return (
        <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Channel: {channel}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Duration: {duration}</p>
            <div className="mt-2 flex flex-wrap gap-2">
                {tags.map(tag => (
                    <Tag key={tag}>
                        {tag}
                    </Tag>
                ))}
            </div>
        </div>
    );
}