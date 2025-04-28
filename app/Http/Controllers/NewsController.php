<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    // --- CRUD utama untuk News ---
    public function index()
    {
        $news = News::latest()->get()->map(function ($item) {
            $item->image_url = url('storage/news/' . $item->image);
            return $item;
        });

        return response()->json($news);
    }

    public function show($id)
    {
        $news = News::with('images')->findOrFail($id);
        $news->image_url = url('storage/news/' . $news->image);

        // Formatkan URL untuk semua gambar tambahan
        $news->images->map(function ($img) {
            $img->url = url('storage/newsdetail/' . $img->image);
        });

        return response()->json($news);
    }

    public function store(Request $request)
    {
        // Validasi
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'required|image|max:2048',
        ]);

        // Proses upload gambar
        $imageName = time() . '.' . $request->image->extension();
        $request->image->storeAs('news', $imageName, 'public');

        // Ambil tanggal saat ini
        $date = now(); // Atau gunakan $request->date jika tanggal dikirimkan dari form

        // Buat berita baru dengan title, description, image, dan date
        $news = News::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imageName,
            'date' => $date, // Menyimpan tanggal
        ]);

        $news->image_url = url('storage/news/' . $news->image);

        // Kembalikan response
        return response()->json($news, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string', // Menambahkan validasi untuk description
            'image' => 'nullable|image|max:2048', // Validasi untuk gambar
            'date' => 'nullable|date', // Validasi untuk tanggal jika dikirimkan
        ]);

        // Ambil data news berdasarkan ID
        $news = News::findOrFail($id);

        // Update title jika ada
        $news->title = $request->title;

        // Update description jika ada
        if ($request->has('description')) {
            $news->description = $request->description;
        }

        // Update date jika ada
        if ($request->has('date')) {
            $news->date = $request->date;
        } else {
            $news->date = now(); // Jika tidak ada, gunakan tanggal saat ini
        }

        // Proses upload gambar jika ada
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($news->image && Storage::disk('public')->exists('news/' . $news->image)) {
                Storage::disk('public')->delete('news/' . $news->image);
            }

            // Upload gambar baru
            $imageName = time() . '.' . $request->image->extension();
            $request->image->storeAs('news', $imageName, 'public');
            $news->image = $imageName;
        }

        // Simpan perubahan
        $news->save();

        // Menambahkan URL gambar
        $news->image_url = url('storage/news/' . $news->image);

        return response()->json($news, 200);
    }
    public function destroy($id)
    {
        $news = News::findOrFail($id);

        if ($news->image && Storage::disk('public')->exists('news/' . $news->image)) {
            Storage::disk('public')->delete('news/' . $news->image);
        }

        $news->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
