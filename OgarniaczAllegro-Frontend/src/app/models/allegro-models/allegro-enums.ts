export enum AllegroEnums {
  AllegroPay = 'Allegro Pay',
  // statusCOMPLETED = 'COMPLETED',
}




// list przewozowy utworzony

export enum AllegroReturnStatusEnums {
  PARTIALLY_RETURNED = 'czesciowo zwrocone',
  RETURNED = 'cale zwrocone', // przesyłka została zwrócona do nadawcy.
}




export enum AllegroParcelStatusEnums {
  UNKNOWN = 'Unknown',
  PAID = 'Zaplacone',
  WAYBILL_CREATED = 'etykieta utworzona',
  IN_PREPARATION = 'w przygotowaniu',
  IN_TRANSIT = 'W drodze',



  // nadanie przesyłki w punkcie,odebranie jej przez kuriera,
  // przyjęcie na sortownie,przekierowanie do innego punktu.
  AVAILABLE_FOR_PICKUP = 'Do odbioru',
  DELIVERED = 'Odebrane',
}
// PENDING - przesyłka została przygotowana przez nadawcę, oczekuje na nadanie;
// RELEASED_FOR_DELIVERY - w trakcie doręczenia przez kuriera (na adres odbiorcy lub do punktu odbioru);
// NOTICE_LEFT - kurier wystawił awizo, przesyłka będzie do odbioru pod adresem podanym na awizo;
// ISSUE - wystąpił problem z przesyłką. Status obejmuje zdarzenia takie jak:
// odmowa przyjęcia przesyłki,
// zagubienie przesyłki.



