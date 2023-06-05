def bbuStatusCheker(score):
  scoreStatus= ['Berat Badan sangat kurang', 'Berat Badan kurang', 'Berat Badan normal', 'Berat Badan lebih']
  scoreTexts= ['Berat badan anak tergolong sangat kurang dari normal usia. Periksa segera ke dokter spesialis anak atau puskesmas terdekat untuk pemeriksaan dan penanganan  lebih lanjut.', 'Berat badan anak tergolong kurang dari normal usia. Periksa segera ke dokter spesialis anak atau puskesmas terdekat untuk pemeriksaan dan penanganan  lebih lanjut.', 'Berat badan anak sesuai usia, lihat kurva berat badan per Tinggi Badan untuk menilai status gizi anak lebih akurat, dan pantau ulang berat badan dan tinggi badan secara berkala.', 'Berat badan tergolong lebih tinggi dari usia normal, lihat kurva berat badan per usia. Periksa segera ke dokter spesialis anak atau puskesmas terdekat untuk pemeriksaan dan penanganan lebih lanjut.']
  hex= ['32B6C1', 'F56D55']
  hexIndex= 1
  index= 0

  if score < -3:
    index= 0 
  elif score >= -3 and score < -2:
    index= 1
  elif score >= -2 and score <= 1:
    index= 2
    hexIndex= 0
  elif score > 2:
    index= 3

  return {
    "status": scoreStatus[index],
    "articles": scoreTexts[index],
    "hex": f"#{hex[hexIndex]}",
  } 

def pbuStatusCheker(score):
  scoreStatus= ['Sangat pendek', 'Pendek', 'Normal', 'Tinggi']
  scoreTexts= ['Anak tergolong sangat pendek dibandingkan umur. Jadwalkan kunjungan ke dokter spesialis anak atau fasilitas kesehatan terdekat untuk pemeriksaan dan penanganan lebih lanjut.', 'Anak tergolong pendek dibandingkan umur. Jadwalkan kunjungan ke dokter spesialis anak atau fasilitas kesehatan terdekat untuk pemeriksaan dan penanganan lebih lanjut.', 'Tinggi badan anak sesuai umur. Pantau ulang tinggi badan secara berkala.', 'Anak tergolong tinggi dibandingkan umur. Jadwalkan kunjungan ke dokter spesialis anak atau fasilitas kesehatan terdekat untuk pemeriksaan dan penanganan lebih lanjut.']
  hex= ['32B6C1', 'F56D55']
  hexIndex= 1
  index= 0

  if score < -3:
    index= 0 
  elif score >= -3 and score < -2:
    index= 1
  elif score >= -2 and score <= 3:
    index= 2
    hexIndex= 0
  elif score > 3:
    index= 3

  return {
    "status": scoreStatus[index],
    "articles": scoreTexts[index],
    "hex": f"#{hex[hexIndex]}",
  } 

def bbpbStatusCheker(score):
  scoreStatus= ['Gizi buruk', 'Gizi Kurang', 'Gizi Baik', 'Beresiko Gizi Lebih', 'Gizi Lebih', 'Obesitas']
  scoreTexts= [
   'Anak mengalami gizi buruk / sangat kurus (severeky wasted). Segera bawa ke fasilitas kesehatan terdekat.',
   'Anak tergolong gizi kurang / kurus (wasted). Jadwalkan kunjungan ke dokter spesialis anak atau fasilitas kesehatan terdekat untuk pemeriksaan dan penanganan lebih lanjut.',
   'Anak tergolong gizi baik. Pantau ulang berat badan dan tinggi badan berkala.',
   'Anak beresiko mengalami gizi lebih. Jadwalkan kunjungan ke dokter spesialis anak atau fasilitas kesehatan terdekat untuk pemeriksaan dan penanganan lebih lanjut.',
   'Anak tergolong gizi lebih (overweight). Jadwalkan kunjungan ke dokter spesialis anak atau fasilitas kesehatan terdekat untuk pemeriksaan dan penanganan lebih lanjut.',
   'Anak mengalami obesitas (obese). Jadwalkan kunjungan ke dokter spesialis anak atau fasilitas kesehatan terdekat untuk pemeriksaan dan penanganan lebih lanjut.']
  hex= ['32B6C1', 'F56D55']
  hexIndex= 1
  index= 0

  if score < -3:
    index= 0 
  elif score >= -3 and score < -2:
    index= 1
  elif score > -2 and score < 1:
    index= 2
    hexIndex= 0
  elif score >= 1 and score < 2:
    index= 3
  elif score >= 2 and score <= 3 :
    index= 4
  elif score > 3:
    index= 5

  print(index)

  return {
    "status": scoreStatus[index],
    "articles": scoreTexts[index],
    "hex": f"#{hex[hexIndex]}",
  } 