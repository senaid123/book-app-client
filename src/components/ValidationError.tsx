import React from 'react';

const ValidationError: React.FC<{ validationErrors: string[] }> = ({
    validationErrors,
}) => {
    return (
        <div className="mb-4 text-red-500 text-sm flex flex-col items-center text-center">
            <ul>
                {validationErrors.map((error: string, index: number) => (
                    <li
                        key={index}
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <span className="font-medium">
                            Validation Error: {error}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ValidationError;
