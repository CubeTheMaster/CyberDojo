const assistanceService = {
  // Funzione per inviare una nuova richiesta di supporto
  sendSupportRequest: async (username, description, token) => {
    try {
      const response = await fetch("http://localhost:3001/assistance/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userUsername: username, description }),
      });

      if (!response.ok) {
        throw new Error("Errore durante la creazione del ticket");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante la creazione del ticket:", error);
      throw error;
    }
  },

  // Funzione per recuperare i ticket dell'utente
  getUserTickets: async (token, username) => {
    try {
      const response = await fetch(
        `http://localhost:3001/assistance/listuser?userUsername=${encodeURIComponent(
          username
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero dei ticket dell'utente");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore nel recupero dei ticket dell'utente:", error);
      throw error;
    }
  },
};

export default assistanceService;
