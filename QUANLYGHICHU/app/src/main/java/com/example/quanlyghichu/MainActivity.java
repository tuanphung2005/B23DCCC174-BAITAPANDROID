package com.example.quanlyghichu;

import android.app.AlertDialog;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements NoteAdapter.OnNoteClickListener {

    private ListView listView;
    private NoteAdapter noteAdapter;
    private List<Note> noteList;

    // 

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        listView = findViewById(R.id.listView);
        FloatingActionButton fabAdd = findViewById(R.id.fabAdd);

        noteList = new ArrayList<>();

        noteAdapter = new NoteAdapter(this, noteList, this);
        listView.setAdapter(noteAdapter);

        fabAdd.setOnClickListener(v -> showNoteDialog(null, -1));
    }
    // edit note true
    // new note false
    private void showNoteDialog(Note note, int position) {
        boolean isEdit = note != null;
        
        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        // edit note true
        // new note false
        builder.setTitle(isEdit ? "Chỉnh sửa ghi chú" : "Thêm ghi chú mới");

        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_note, null);
        EditText etTitle = dialogView.findViewById(R.id.etTitle);
        EditText etContent = dialogView.findViewById(R.id.etContent);

        if (isEdit) {
            etTitle.setText(note.getTitle());
            etContent.setText(note.getContent());
        }

        builder.setView(dialogView);
        // main activity -> dialog
        builder.setPositiveButton(isEdit ? "Lưu" : "Thêm", (dialog, which) -> {
            String title = etTitle.getText().toString().trim();
            String content = etContent.getText().toString().trim();

            if (title.isEmpty()) {
                Toast.makeText(this, "Vui lòng nhập tiêu đề", Toast.LENGTH_SHORT).show();
                Log.d("main activity","empty title");
                return;
            }

            if (isEdit) {
                note.setTitle(title);
                note.setContent(content);
            } else {
                noteList.add(new Note(title, content));
            }
            noteAdapter.notifyDataSetChanged();
        });

        builder.setNegativeButton("Hủy", null);

        // dialog -> main activity
        builder.show();
    }

    @Override
    public void onEditClick(int position) {
        showNoteDialog(noteList.get(position), position);
    }

    @Override
    public void onDeleteClick(int position) {
        noteList.remove(position);
        noteAdapter.notifyDataSetChanged();
        Toast.makeText(this, "Đã xóa ghi chú", Toast.LENGTH_SHORT).show();
    }
}