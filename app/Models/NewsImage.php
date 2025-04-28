<?php

// app/Models/NewsImage.php
// app/Models/NewsImage.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsImage extends Model
{
    use HasFactory;

    protected $fillable = ['image'];

    public function news()
    {
        return $this->belongsTo(News::class);
    }
}
