<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title inertia>{{ config('app.name', 'TENANTS HQ') }}</title>
  <!-- Inter Font - Similar to Proxima Nova with excellent symbol support -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <!-- Literata Font - For property titles and specific cases -->
  <link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600;7..72,700&display=swap"
        rel="stylesheet">
  @viteReactRefresh
  @vite(['resources/css/app.css', 'resources/js/app.tsx'])
  @inertiaHead
</head>

<body class="font-sans antialiased">
  @inertia
</body>

</html>
