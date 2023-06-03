import pandas as pd
import os
					
class psg():
	def __init__(self, umur, bb, pb_tb):

			self.umur = umur
			self.bb = float(bb) 
			self.pb_tb = pb_tb 
		
	def bbu(self):
			bbudata  = pd.DataFrame(pd.read_csv(os.path.join(os.getcwd(), 'datasets/bbperu.csv')))
			umur     = pd.Series(bbudata['umur bulan'])
			min_1sd  = pd.Series(bbudata['-1 SD'])
			median   = pd.Series(bbudata['Median'])
			plus_1sd = pd.Series(bbudata['+1 SD'])
			dictbbu  = {'umur':umur, '-1sd':min_1sd, 'median':median, '+1sd':plus_1sd}
			umurData     = list(dictbbu['umur'])
			plus1sd  = list(dictbbu['+1sd'])
			median   = list(dictbbu['median'])
			mins1sd  = list(dictbbu['-1sd'])
	
			umur= self.umur

			if self.bb <= median[umur]:
					bbu = (self.bb - median[umur]) / (median[umur] - mins1sd[umur])
					z_score = bbu   
			
			elif self.bb > median[umur]:
					bbu = (self.bb - median[umur]) / (plus1sd[umur] - median[umur])
					z_score = bbu   
						
			return round(z_score,2)

	def pb_tb_u(self):
			bbudata  = pd.DataFrame(pd.read_csv(os.path.join(os.getcwd(), 'datasets/pbtbperu.csv')))
			umur     = pd.Series(bbudata['umur bulan'])
			min_1sd  = pd.Series(bbudata['-1 SD'])
			median   = pd.Series(bbudata['Median'])
			plus_1sd = pd.Series(bbudata['+1 SD'])
			dictbbu  = {'umur':umur, '-1sd':min_1sd, 'median':median, '+1sd':plus_1sd}
			usia     = list(dictbbu['umur'])
			plus1sd  = list(dictbbu['+1sd'])
			median   = list(dictbbu['median'])
			mins1sd  = list(dictbbu['-1sd'])
			
			umur= self.umur

			if self.pb_tb <= median[umur]:
					pbtb_u = (self.pb_tb - median[umur]) / (median[umur] - mins1sd[umur])
					z_score = pbtb_u
			
			elif self.pb_tb > median[umur]:
					pbtb_u = (self.pb_tb - median[umur]) / (plus1sd[umur] - median[umur])
					z_score = pbtb_u
			
			return round(z_score, 2)

	def bb_pb(self):
		bbudata  = pd.DataFrame(pd.read_csv(os.path.join(os.getcwd(), 'datasets/bbperpb_formatted.csv')))
		pb     = pd.Series(bbudata['panjang badan'])
		min_1sd  = pd.Series(bbudata['-1 SD'])
		median   = pd.Series(bbudata['Median'])
		plus_1sd = pd.Series(bbudata['+1 SD'])
		dictbbu  = {'panjang_badan':pb, '-1sd':min_1sd, 'median':median, '+1sd':plus_1sd}
		panjangBadanData= list(dictbbu['panjang_badan'])
		plus1sd  = list(dictbbu['+1sd'])
		median   = list(dictbbu['median'])
		mins1sd  = list(dictbbu['-1sd'])
		panjang_badan= 0

		try:	
			panjang_badan = panjangBadanData.index(self.pb_tb)
		except:
			panjang_badan= len(panjangBadanData) - 1
		finally:
			if self.bb <= median[panjang_badan]:
					bbpb = (self.bb - median[panjang_badan]) / (median[panjang_badan] - mins1sd[panjang_badan])
					z_score = bbpb
			
			elif self.bb > median[panjang_badan]:
					bbpb = (self.bb - median[panjang_badan]) / (plus1sd[panjang_badan] - median[panjang_badan])
					z_score = bbpb

			return round(z_score, 2)   
