// sw.js
const ENCODED_FRAG = "&#x73;&#x65;&#x63;&#x6f;&#x6e;&#x64;&#x5f;&#x70;&#x61;&#x72;&#x74;&#x20;&#x69;&#x73;&#x20;&#x2e;&#x2e;&#x2e;&#x24;&#x6d;&#x30;&#x2e;&#x2e;&#x2e;";

const fakeResponse = {
  frag3: ENCODED_FRAG,
  status: "success",
  hint: "decode_html_entities"
};

self.addEventListener('fetch', event => {
  const url = event.request.url;

  if (url.includes('fake-api-hint.json')) {
    event.respondWith(
      new Response(JSON.stringify(fakeResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-CTF-Hint': 'decode_entities',
          'Cache-Control': 'no-store'
        }
      })
    );
  }
});