import React, { useState, useCallback, ChangeEvent } from 'react';
import { INodeData } from './node-data.interface';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import ChapterNode from './ChapterNode';

const NodeContent = ({ data, nodeType }: { data: INodeData, nodeType: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.label);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, [setText]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    data.label = text.length > 0 ? text : 'No title';
    setText(data.label);
  }, [data, text, setText, setIsEditing]);

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <TextField
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <Typography variant={nodeType === ChapterNode.name ? 'subtitle1' : 'subtitle2'} >{text}</Typography>
      )}
    </div>
  );
};;
export default NodeContent;
