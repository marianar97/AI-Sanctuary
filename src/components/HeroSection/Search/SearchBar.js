import React from 'react';
import Input from './Input';
import Button from './Button';

export default function SearchBar() {
    return (
            <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2 justify-center">
                  <Input className="max-w-lg flex-1" />
                  <Button type="submit"></Button>
                </form>
            </div>
        // <div class="flex space-x-2">
        //     <input type="text" placeholder="Search AI videos" />
        //     <button onClick={() => {console.log("Search button clicked")}}>Search</button>
        // </div>
    );
}

// flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1