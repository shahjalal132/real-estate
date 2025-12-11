<?php

namespace App\Http\Controllers;

use App\Models\Broker;
use Illuminate\Http\Request;

class BrokerController extends Controller
{
    /**
     * Search brokers by name
     */
    public function search(Request $request)
    {
        $search = $request->input('search', '');
        $limit = $request->input('limit', 20);

        $query = Broker::with('brokerage')
            ->select('id', 'first_name', 'last_name', 'email', 'thumbnail_url', 'brokerage_id')
            ->orderBy('first_name')
            ->orderBy('last_name');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$search}%"]);
            });
        }

        $brokers = $query->limit($limit)->get()->map(function ($broker) {
            return [
                'id' => $broker->id,
                'full_name' => $broker->full_name,
                'first_name' => $broker->first_name,
                'last_name' => $broker->last_name,
                'email' => $broker->email,
                'thumbnail_url' => $broker->thumbnail_url,
                'brokerage_name' => $broker->brokerage?->name,
            ];
        });

        return response()->json($brokers);
    }
}
