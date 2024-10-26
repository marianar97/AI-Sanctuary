import React from 'react';
import Input from './Input';
import Button from './Button';

export default function SearchBar({value, handleSearch}) {
    return (
            <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2 justify-center">
                  <Input className="max-w-lg flex-1"  value={value} handleSearch={handleSearch}/>
                  <Button handleSearch={handleSearch}></Button>
                </form>
            </div>
    );
}
