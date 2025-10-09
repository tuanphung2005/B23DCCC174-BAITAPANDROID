package com.example.quanlyghichu;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.TextView;

import java.util.List;

public class NoteAdapter extends BaseAdapter {
    private Context context;
    private List<Note> noteList;
    private OnNoteClickListener listener;

    public interface OnNoteClickListener {
        void onEditClick(int position);
        void onDeleteClick(int position);
    }

    public NoteAdapter(Context context, List<Note> noteList, OnNoteClickListener listener) {
        this.context = context;
        this.noteList = noteList;
        this.listener = listener;
    }

    @Override
    public int getCount() {
        return noteList.size();
    }

    @Override
    public Object getItem(int position) {
        return noteList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.item_note, parent, false);
        }

        Note note = noteList.get(position);
        
        TextView tvTitle = convertView.findViewById(R.id.tvTitle);
        TextView tvContent = convertView.findViewById(R.id.tvContent);
        Button btnEdit = convertView.findViewById(R.id.btnEdit);
        Button btnDelete = convertView.findViewById(R.id.btnDelete);

        tvTitle.setText(note.getTitle());
        tvContent.setText(note.getContent());

        btnEdit.setOnClickListener(v -> listener.onEditClick(position));
        btnDelete.setOnClickListener(v -> listener.onDeleteClick(position));

        return convertView;
    }
}
