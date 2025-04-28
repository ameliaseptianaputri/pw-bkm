<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::all();
        return response()->json($galleries);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->file('image')->storeAs('galeri', $imageName, 'public');

            $gallery = Gallery::create([
                'image' => $imageName,
            ]);

            return response()->json($gallery, 201);
        }

        return response()->json(['message' => 'Image upload failed.'], 400);
    }

    public function show($id)
    {
        $gallery = Gallery::findOrFail($id);
        return response()->json($gallery);
    }

    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);

        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Hapus gambar lama
            if ($gallery->image) {
                Storage::disk('public')->delete('galeri/' . $gallery->image);
            }

            $imageName = time() . '.' . $request->image->extension();
            $request->file('image')->storeAs('galeri', $imageName, 'public');

            $gallery->update([
                'image' => $imageName,
            ]);
        }

        return response()->json($gallery);
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);

        if ($gallery->image) {
            Storage::disk('public')->delete('galeri/' . $gallery->image);
        }

        $gallery->delete();

        return response()->json(['message' => 'Gallery deleted successfully.']);
    }
}