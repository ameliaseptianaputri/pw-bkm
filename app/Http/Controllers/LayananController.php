<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LayananController extends Controller
{
    public function index()
    {
        return response()->json(Layanan::all());
    }

    public function store(Request $request)
{
    $request->validate([
        'judul' => 'required',
        'deskripsi' => 'required',
        'gambar' => 'nullable|image|max:2048'
    ]);

    $imageName = null;
    if ($request->hasFile('gambar')) {
        $imageName = time() . '.' . $request->gambar->extension();
        $request->file('gambar')->storeAs('layanan', $imageName, 'public');
    }

    $layanan = Layanan::create([
        'judul' => $request->judul,
        'deskripsi' => $request->deskripsi,
        'gambar' => $imageName,
    ]);

    return response()->json($layanan); // pastikan respons ini benar
}

    public function update(Request $request, $id)
    {
        $layanan = Layanan::findOrFail($id);
        $layanan->judul = $request->judul;
        $layanan->deskripsi = $request->deskripsi;

        if ($request->hasFile('gambar')) {
            // Hapus gambar lama
            if ($layanan->gambar && Storage::disk('public')->exists('layanan/' . $layanan->gambar)) {
                Storage::disk('public')->delete('layanan/' . $layanan->gambar);
            }

            $imageName = time() . '.' . $request->gambar->extension();
            $request->file('gambar')->storeAs('layanan', $imageName, 'public');
            $layanan->gambar = $imageName;
        }

        $layanan->save();

        return response()->json($layanan);
    }

    public function destroy($id)
    {
        $layanan = Layanan::findOrFail($id);
        if ($layanan->gambar && Storage::disk('public')->exists('layanan/' . $layanan->gambar)) {
            Storage::disk('public')->delete('layanan/' . $layanan->gambar);
        }
        $layanan->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
