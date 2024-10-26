import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import SellingPlacePopup from "../components/sellingPlacePopup";

// Configurer moment en français
moment.locale("fr");
const localizer = momentLocalizer(moment);

const SellingPlaceCalendar = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [selectedSellingPlace, setSelectedSellingPlace] = useState(null); // État pour la popup

  const getSellingPlaces = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/sellingPlaces`)
      .then((response) => {
        setEvents(
          response.data.map((sellingPlace) => ({
            title: sellingPlace.name,
            start: new Date(sellingPlace.dateFrom),
            end: new Date(sellingPlace.dateTo),
            allDay: true,
            description: sellingPlace.description,
            color: sellingPlace.color || "#3174ad", // Ajout de la couleur (défaut en bleu)
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching selling places:", error);
      });
  };

  const getNotPrivateSellingPlaces = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/sellingPlaces/notPrivate`)
      .then((response) => {
        setEvents(
          response.data.map((sellingPlace) => ({
            title: sellingPlace.name,
            start: new Date(sellingPlace.dateFrom),
            end: new Date(sellingPlace.dateTo),
            allDay: true,
            description: sellingPlace.description,
            color: sellingPlace.color || "#3174ad", // Ajout de la couleur (défaut en bleu)
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching selling places:", error);
      });
  };

  useEffect(() => {
    if (user && (user.role === "admin" || user.role === "superadmin")) {
      getSellingPlaces();
    } else {
      getNotPrivateSellingPlaces();
    }
  }, [user]);

  const handleEventClick = (event) => {
    setSelectedSellingPlace(event); // Ouvrir la popup avec les détails de l'événement
  };

  const handleClosePopup = () => {
    setSelectedSellingPlace(null); // Fermer la popup
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color, // Utiliser la couleur définie pour l'événement
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0",
      display: "block",
    };
    return {
      style,
    };
  };

  // Fonction pour ajuster la taille des cases en fonction du nombre d'événements
  const dayPropGetter = (date) => {
    const numEvents = events.filter(
      (event) =>
        moment(event.start).isSame(date, "day") ||
        moment(event.end).isSame(date, "day") ||
        (moment(event.start).isBefore(date) && moment(event.end).isAfter(date))
    ).length;

    const style = {
      height: `${Math.max(50, 100 + numEvents * 20)}px`, // Ajuste la hauteur ici
    };

    return {
      style,
    };
  };

  const allDayAccessor = (event) => {
    return event.allDay; // Utiliser l'attribut allDay pour afficher tous les événements
  };

  return (
    <div style={{ height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        culture="fr"
        messages={{
          next: "Suivant",
          previous: "Précédent",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          agenda: "Agenda",
          date: "Date",
          time: "Heure",
          event: "Événement",
          noEventsInRange: "Aucun événement dans cette plage de dates.",
          allDay: "Toute la journée",
          showMore: (total) => `+ ${total} événement(s) supplémentaire(s)`, // Optionnel, pour personnaliser le texte
        }}
        formats={{
          dateFormat: "DD",
          dayFormat: (date, culture, localizer) =>
            localizer.format(date, "dddd", culture),
          weekdayFormat: (date, culture, localizer) =>
            localizer.format(date, "dddd", culture).substring(0, 3),
        }}
        onSelectEvent={handleEventClick} // Ajout du gestionnaire de clic
        eventPropGetter={eventStyleGetter} // Appliquer le style aux événements
        dayPropGetter={dayPropGetter} // Appliquer le style aux jours
        allDayAccessor={allDayAccessor} // Afficher tous les
        popup // Activer le mode popup
        // Set this property to true to show all events in the same time slot
        selectable
      />

      {/* Afficher la popup si un événement est sélectionné */}
      {selectedSellingPlace && (
        <SellingPlacePopup
          sellingPlace={selectedSellingPlace}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default SellingPlaceCalendar;
