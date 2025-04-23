<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'message' => 'Login berhasil',
                'user' => $user,
                'role' => $user->role,
                'access_token' => $token,
                'token_type' => 'Bearer'
            ]);
        }

        return response()->json(['message' => 'Login gagal'], 401);
    }
}
