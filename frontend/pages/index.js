import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "Carbone",
    date: "",
    party_size: 2,
    mode: "carbone"
  });

  const loadTargets = async () => {
    const res = await axios.get(`${API}/targets`);
    setTargets(res.data);
  };

  useEffect(() => {
    loadTargets();
  }, []);

  const addTarget = async () => {
    if (!form.date) {
      alert("Pick a date");
      return;
    }

    setLoading(true);
    await axios.post(`${API}/targets`, form);
    setLoading(false);
    loadTargets();
  };

  const deleteTarget = async (id) => {
    await axios.delete(`${API}/targets/${id}`);
    loadTargets();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽 Reservation Sniper</h1>

      {/* Add Target */}
      <div style={styles.card}>
        <h2>Add Target</h2>

        <div style={styles.row}>
          <select
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={styles.input}
          >
            <option>Carbone</option>
            <option>Don Angie</option>
            <option>Torrisi</option>
            <option>4 Charles</option>
            <option>Via Carota</option>
          </select>

          <input
            type="date"
            style={styles.input}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="number"
            value={form.party_size}
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, party_size: Number(e.target.value) })
            }
          />

          <select
            style={styles.input}
            onChange={(e) => setForm({ ...form, mode: e.target.value })}
          >
            <option value="carbone">🔥 Carbone Mode</option>
            <option value="normal">Normal</option>
          </select>

          <button style={styles.button} onClick={addTarget}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* Targets List */}
      <div style={styles.card}>
        <h2>Active Targets</h2>

        {targets.length === 0 && <p>No targets yet</p>}

        {targets.map((t) => (
          <div key={t.id} style={styles.target}>
            <div>
              <strong>{t.name}</strong> — {t.date}  
              <span style={styles.mode}>
                {t.mode === "carbone" ? "🔥 Carbone" : "Normal"}
              </span>
            </div>

            <button
              style={styles.delete}
              onClick={() => deleteTarget(t.id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    fontFamily: "Arial",
    background: "#f5f5f5",
    minHeight: "100vh"
  },
  title: {
    fontSize: 32,
    marginBottom: 20
  },
  card: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  row: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap"
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ddd"
  },
  button: {
    padding: "10px 15px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },
  target: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    borderBottom: "1px solid #eee"
  },
  delete: {
    background: "none",
    border: "none",
    cursor: "pointer"
  },
  mode: {
    marginLeft: 10,
    fontSize: 12,
    color: "gray"
  }
};
