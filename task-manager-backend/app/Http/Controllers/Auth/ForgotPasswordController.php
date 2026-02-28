<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;

class ForgotPasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // Check if user exists
        $user = DB::table('users')->where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Email not found'], 404);
        }

        // Generate token
        $token = Str::random(64);

        // Store token in the correct table
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            ['token' => $token, 'created_at' => now()]
        );

        // Send email
        $resetLink = url('http://localhost:5173/reset-password?token='.$token.'&email='.$request->email);
        Mail::raw("Click here to reset your password: $resetLink", function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Password Reset Request');
        });

        return response()->json(['message' => 'Reset link sent to your email']);
    }
}
