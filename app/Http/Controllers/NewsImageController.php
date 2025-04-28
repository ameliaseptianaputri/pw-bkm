<?php

namespace App\Http\Controllers;

use App\Models\News; // Pastikan untuk menggunakan model yang tepat
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsImageController extends Controller
{
    // Menambahkan gambar ke berita
    public function addImage(Request $request, $newsId)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $news = News::findOrFail($newsId);

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($news->image && Storage::disk('public')->exists('news/' . $news->image)) {
                Storage::disk('public')->delete('news/' . $news->image);
            }

            $imageName = time() . '.' . $request->image->extension();
            $request->file('image')->storeAs('news', $imageName, 'public');
            $news->image = $imageName;
            $news->save();
        }

        return response()->json($news);
    }

    // Menghapus gambar dari berita
    public function removeImage($newsId)
    {
        $news = News::findOrFail($newsId);

        if ($news->image && Storage::disk('public')->exists('news/' . $news->image)) {
            Storage::disk('public')->delete('news/' . $news->image);
            $news->image = null;
            $news->save();
        }

        return response()->json(['message' => 'Gambar berhasil dihapus']);
    }
    public function getImages($id)
{
    $news = News::find($id);

    if (!$news) {
        return response()->json(['error' => 'News not found'], 404);
    }

    $images = $news->images; // Misalkan relasi gambar berada di `images`
    return response()->json($images);
}
}
