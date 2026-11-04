export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });

    let html = await res.text();

    // Inject <base> so all CSS, JS, and images load from the target domain
    const origin = new URL(targetUrl).origin;
    if (html.includes("<head>")) {
      html = html.replace(
        "<head>",
        `<head><base href="${origin}/" target="_blank">`
      );
    } else if (html.includes("<head ")) {
      html = html.replace(
        /<head[^>]*>/,
        `$&<base href="${origin}/" target="_blank">`
      );
    }

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        // Remove frame restrictions
      },
    });
  } catch (err) {
    return new Response(`Error proxying URL: ${err.message}`, { status: 500 });
  }
}

