<?php

namespace App\Http\Controllers;

use App\Models\Kalender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use function Illuminate\Log\log;

class KalenderController extends Controller
{
    public function index()
    {
        return Kalender::all();
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'location' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);
    
        if ($request->hasFile('image')) {
            // Menggunakan timestamp untuk nama file gambar
            $imageName = time() . '.' . $request->image->extension();
            $path = $request->file('image')->storeAs('kalender', $imageName, 'public');
    
            // Pastikan path disimpan dengan benar
            Log::info('Image stored at: ' . $path);
    
            $validated['image'] = 'kalender/' . $imageName; // Menyimpan path yang sesuai
        }
    
        // Simpan data kalender ke database
        $kalender = Kalender::create($validated);
    
        return response()->json($kalender, 201);
    }
    

public function update(Request $request, $id)
{
    $kalender = Kalender::findOrFail($id);

    $validated = $request->validate([
        'description' => 'required|string',
        'date' => 'required|date',
        'time' => 'required|date_format:H:i',
        'location' => 'required|string',
        'image' => 'nullable|image|max:2048',
    ]);

    if ($request->hasFile('image')) {
        // Menghapus gambar lama jika ada
        if ($kalender->image) {
            Storage::delete('public/' . $kalender->image);
        }
        
        // Menyimpan gambar dengan nama yang berbasis timestamp
        $imageName = time() . '.' . $request->image->extension();
        $request->file('image')->storeAs('kalender', $imageName, 'public');
        $validated['image'] = 'kalender/' . $imageName; // Menyimpan path yang sesuai
    }

    $kalender->update($validated);

    return response()->json($kalender);
}

    public function destroy($id)
    {
        $kalender = Kalender::findOrFail($id);

        // Hapus gambar jika ada
        if ($kalender->image) {
            Storage::delete('public/' . $kalender->image);
        }

        $kalender->delete();

        return response()->json(null, 204);
    }

    }
    
