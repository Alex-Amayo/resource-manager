import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileUp } from 'lucide-react';
import type { ControllerRenderProps } from 'react-hook-form';
import type { Item } from '../../types.ts';

interface InputFileProps {
  id: string;
  field: ControllerRenderProps<Item, string>;
  onFileUpload?: (file: File) => Promise<string>;
}

export function InputFile({ id, field, onFileUpload }: InputFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      setUploading(true);
      if (onFileUpload) {
        const url = await onFileUpload(file);
        field.onChange(url);
        setUploaded(true);
      } else {
        field.onChange(file);
      }
      setUploading(false);
    } else {
      setFileName("");
      setUploaded(false);
      field.onChange("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        id={id}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading}>
        <FileUp className="mr-2" />
        {uploading
          ? 'Uploading...'
          : fileName
            ? (uploaded ? 'Replace file' : 'Upload file')
            : 'Upload file'}
      </Button>
      {fileName && (
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <span>{fileName}</span>
          {uploading && <span className="animate-pulse text-blue-600">Uploading...</span>}
          {uploaded && !uploading && <span className="text-green-600">✓ Uploaded</span>}
        </div>
      )}
    </div>
  );
}
