import React from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../ui/card';

interface UploadProgressProps {
    isUploading: boolean;
    percentage: number;
    fileName?: string;
    error?: string | null;
    success?: boolean;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
    isUploading,
    percentage,
    fileName,
    error,
    success,
}) => {
    if (!isUploading && !error && !success) {
        return null;
    }

    return (
        <Card className={`p-4 ${error ? 'bg-red-50 border-red-200' : success ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-center gap-3">
                {error ? (
                    <div className="p-2 bg-red-100 rounded-lg text-red-600 flex-shrink-0">
                        <AlertCircle size={20} />
                    </div>
                ) : success ? (
                    <div className="p-2 bg-green-100 rounded-lg text-green-600 flex-shrink-0">
                        <CheckCircle size={20} />
                    </div>
                ) : (
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0 animate-spin">
                        <Upload size={20} />
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    {error ? (
                        <p className="text-sm font-medium text-red-600">{error}</p>
                    ) : success ? (
                        <div>
                            <p className="text-sm font-medium text-green-600">✅ Muvaffaqiyatli yuklandi!</p>
                            {fileName && (
                                <p className="text-xs text-green-600 mt-1">{fileName}</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm font-medium text-blue-900">
                                Yuklanimoqda {fileName && `- ${fileName}`}
                            </p>
                            <div className="mt-2 w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <p className="text-xs text-blue-600 mt-1 font-medium">{percentage}%</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};