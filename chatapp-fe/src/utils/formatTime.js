import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  if(!date.endsWith('Z'))
  date = date + 'z'
  return format(date, 'dd MMMM yyyy');
}

export function fDateTime(date) {
 
  if(!date.endsWith('Z'))
     date = date + 'z'
  return format(date, 'dd MMM yyyy HH:mm',{timeZone : "UTC"});
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
