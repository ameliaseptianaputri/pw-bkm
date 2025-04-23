<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title',
        'content',
        'image',
        'detail_title',
        'detail_description',
        'detail_image',
        'event_date'
    ];
    
}
