<?php

namespace App\Http\Controllers;

use App\Models\Biodata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BiodataController extends Controller
{
    // Menampilkan semua biodata
    public function index()
    {
        $biodatas = Biodata::all();
        return response()->json($biodatas);
    }

    // Menyimpan biodata baru
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string',
            'name' => 'required|string|max:255',
            'division' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $imageName = null;

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->file('image')->storeAs('biodata', $imageName, 'public');
        }

        $biodata = Biodata::create([
            'category' => $request->category,
            'name' => $request->name,
            'division' => $request->division,
            'image' => $imageName,
        ]);

        return response()->json($biodata, 201);
    }

    // Menampilkan detail biodata berdasarkan ID
    public function show($id)
    {
        $biodata = Biodata::findOrFail($id);
        return response()->json($biodata);
    }

    // Mengupdate biodata berdasarkan ID
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'division' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $biodata = Biodata::findOrFail($id);

        // Handle image jika ada
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($biodata->image && Storage::disk('public')->exists('biodata/' . $biodata->image)) {
                Storage::disk('public')->delete('biodata/' . $biodata->image);
            }

            $imageName = time() . '.' . $request->image->extension();
            $request->file('image')->storeAs('biodata', $imageName, 'public');
            $biodata->image = $imageName;
        }

        // Update data lain
        $biodata->category = $request->category;
        $biodata->name = $request->name;
        $biodata->division = $request->division;
        $biodata->save();

        return response()->json($biodata);
    }

    // Menghapus biodata berdasarkan ID
    public function destroy($id)
    {
        $biodata = Biodata::findOrFail($id);

        // Hapus gambar jika ada
        if ($biodata->image && Storage::disk('public')->exists('biodata/' . $biodata->image)) {
            Storage::disk('public')->delete('biodata/' . $biodata->image);
        }

        $biodata->delete();

        return response()->json(['message' => 'Biodata berhasil dihapus']);
    }
}