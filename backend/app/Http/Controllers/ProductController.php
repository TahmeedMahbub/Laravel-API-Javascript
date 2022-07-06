<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function getAll()
    {
        return Product::all();
    }
    public function getID($id)
    {
        return Product::find($id);
    }
    public function create(Request $request)
    {
        return Product::create($request->all());
    }
    public function delete($id)
    {
        return Product::destroy($id);
    }
    public function edit(Request $request, $id)
    {
        $product = Product::find($id);
        $product->update($request->all());
        return $product;
    }
    
}
