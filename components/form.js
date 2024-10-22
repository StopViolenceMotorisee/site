import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export function AppForm() {
  const [temoignage, setTemoignage] = useState("");
  const [lieu, setLieu] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  async function publish() {
    if (temoignage.length == 0) {
      setError(true);
      return;
    }
    setError(false);
    setSending(true);
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const result = await supabaseClient.from("temoignages").insert({
      histoire: temoignage,
      lieu,
      identite: nom,
      email,
    });
    setTemoignage("");
    setSending(false);
    setDone(true);
  }

  return (
    <>
      {!done ? (
        <>
          <div class="field">
            <label class="label">Témoignage</label>
            <div class="control">
              <textarea
                class="textarea"
                value={temoignage}
                onChange={(e) => setTemoignage(e.target.value)}
              ></textarea>
            </div>
            {error ? (
              <p class="help is-danger">
                Ce champs ne peut pas être laissé vide.
              </p>
            ) : (
              <></>
            )}
          </div>
          <div class="field">
            <label class="label">Lieu</label>
            <div class="control">
              <input
                class="input"
                type="text"
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Nom</label>
            <div class="control">
              <input
                class="input"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Adresse email</label>
            <div class="control">
              <input
                class="input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p class="help">
              Cette adresse email ne sera jamais publiée. Elle nous permettra de
              vous contacter si nécessaire.
            </p>
          </div>

          <div class="section field is-grouped">
            <div class="control">
              <button
                class="button"
                disabled={sending}
                onClick={() => publish()}
              >
                Envoyer
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div class="notification">Nous avons bien reçu votre témoignage.</div>
          <div class="section field is-grouped">
            <div class="control">
              <button class="button" onClick={() => setDone(!done)}>
                Faire un nouveau témoignage
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
