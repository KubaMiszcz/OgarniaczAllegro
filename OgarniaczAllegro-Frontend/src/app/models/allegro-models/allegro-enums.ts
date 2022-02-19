export enum AllegroEnums {
  AllegroPay = 'Allegro Pay', //value with space, dont remove
}




// list przewozowy utworzony

export enum AllegroReturnStatusEnums {
  UNKNOWN = 'Unknown',
  PARTIALLY_RETURNED = 'czesciowo zwrocone',
  RETURNED = 'cale zwrocone', // przesyłka została zwrócona do nadawcy.
}
// s: Array(4)
// 0: {type: 'CREATED', active: false, label: 'Zwrot zgłoszony', hint: 'Od 4 lut 20:24'}
// 1: {type: 'IN_TRANSIT', active: false, label: 'Zwrot w drodze', hint: 'Od 5 lut 09:50'}
// 2: {type: 'DELIVERED', active: false, label: 'Zwrot u sprzedającego', hint: 'Od 7 lut 09:28'}
// 3: {type: 'FINISHED', active: true, label: 'Zwrot zakończony', hint: 'Pełen zwrot pieniędzy'}
// l






















export enum AllegroParcelStatusEnums {
  UNKNOWN = 'Unknown',
  PAID = 'Zaplacone',
  WAYBILL_CREATED = 'etykieta utworzona',
  IN_PREPARATION = 'w przygotowaniu',
  IN_TRANSIT = 'W drodze',
  MISSING_ENUM = 'MISSING_ENUM',



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






