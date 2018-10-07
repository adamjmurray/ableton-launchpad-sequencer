{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"rect" : [ 1349.0, 85.0, 640.0, 649.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"comment" : "selected pattern index",
					"id" : "obj-6",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 309.0, 18.0, 30.0, 30.0 ],
					"presentation_rect" : [ 309.0, 18.0, 30.0, 30.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 43.0, 73.0, 43.0, 22.0 ],
					"presentation_rect" : [ 43.0, 73.0, 43.0, 22.0 ],
					"style" : "",
					"text" : "* -170"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 43.0, 118.0, 67.0, 22.0 ],
					"presentation_rect" : [ 43.0, 118.0, 67.0, 22.0 ],
					"style" : "",
					"text" : "offset 0 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 43.0, 162.0, 69.0, 22.0 ],
					"presentation_rect" : [ 43.0, 162.0, 69.0, 22.0 ],
					"save" : [ "#N", "thispatcher", ";", "#Q", "end", ";" ],
					"style" : "",
					"text" : "thispatcher"
				}

			}
, 			{
				"box" : 				{
					"comment" : "selected track index",
					"id" : "obj-5",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 43.0, 18.0, 30.0, 30.0 ],
					"presentation_rect" : [ 43.0, 18.0, 30.0, 30.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"args" : [ 4 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-4",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "track.maxpat",
					"numinlets" : 1,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 428.0, 129.0, 85.0, 63.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 510.0, 450.0, 170.0 ],
					"varname" : "track[3]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ 3 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-3",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "track.maxpat",
					"numinlets" : 1,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 341.0, 129.0, 85.0, 63.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 340.0, 450.0, 170.0 ],
					"varname" : "track[2]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ 2 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-2",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "track.maxpat",
					"numinlets" : 1,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 254.0, 129.0, 85.0, 63.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 170.0, 450.0, 170.0 ],
					"varname" : "track[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ 1 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-1",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "track.maxpat",
					"numinlets" : 1,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 167.0, 129.0, 85.0, 63.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 0.0, 450.0, 170.0 ],
					"varname" : "track[0]",
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"order" : 3,
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"order" : 2,
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"order" : 1,
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"order" : 0,
					"source" : [ "obj-6", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-1::obj-1::obj-1::obj-1" : [ "start_ui[31]", "start_ui", 0 ],
			"obj-2::obj-1::obj-6::obj-24" : [ "end[18]", "end", 0 ],
			"obj-2::obj-1::obj-2::obj-33" : [ "mute[24]", "mute", 0 ],
			"obj-3::obj-1::obj-6::obj-22" : [ "start[10]", "start", 0 ],
			"obj-3::obj-1::obj-5::obj-24" : [ "end[11]", "end", 0 ],
			"obj-3::obj-1::obj-2::obj-8" : [ "end_ui[14]", "end_ui", 0 ],
			"obj-4::obj-1::obj-8::obj-8" : [ "end_ui", "end_ui", 0 ],
			"obj-4::obj-1::obj-5::obj-7" : [ "mute_ui[3]", "mute_ui", 0 ],
			"obj-4::obj-1::obj-5::obj-2" : [ "steps[3]", "steps", 0 ],
			"obj-1::obj-1::obj-2::obj-1" : [ "start_ui[30]", "start_ui", 0 ],
			"obj-1::obj-1::obj-1::obj-24" : [ "end[31]", "end", 0 ],
			"obj-2::obj-1::obj-8::obj-24" : [ "end[16]", "end", 0 ],
			"obj-3::obj-1::obj-6::obj-8" : [ "end_ui[10]", "end_ui", 0 ],
			"obj-4::obj-1::obj-7::obj-24" : [ "end[1]", "end", 0 ],
			"obj-4::obj-1::obj-7::obj-8" : [ "end_ui[1]", "end_ui", 0 ],
			"obj-2::obj-1::obj-8::obj-7" : [ "mute_ui[19]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-3::obj-2" : [ "steps[21]", "steps", 0 ],
			"obj-3::obj-7" : [ "gate[1]", "gate", 0 ],
			"obj-4::obj-1::obj-3::obj-33" : [ "mute[5]", "mute", 0 ],
			"obj-4::obj-1::obj-4::obj-1" : [ "start_ui[4]", "start_ui", 0 ],
			"obj-1::obj-1::obj-3::obj-8" : [ "end_ui[29]", "end_ui", 0 ],
			"obj-2::obj-1::obj-6::obj-2" : [ "steps[18]", "steps", 0 ],
			"obj-2::obj-1::obj-2::obj-7" : [ "mute_ui[25]", "mute_ui", 0 ],
			"obj-3::obj-1::obj-7::obj-24" : [ "end[9]", "end", 0 ],
			"obj-3::obj-1::obj-4::obj-24" : [ "end[12]", "end", 0 ],
			"obj-4::obj-1::obj-2::obj-22" : [ "start[6]", "start", 0 ],
			"obj-1::obj-1::obj-8::obj-8" : [ "end_ui[24]", "end_ui", 0 ],
			"obj-1::obj-1::obj-2::obj-24" : [ "end[30]", "end", 0 ],
			"obj-2::obj-1::obj-5::obj-2" : [ "steps[19]", "steps", 0 ],
			"obj-4::obj-1::obj-4::obj-7" : [ "mute_ui[4]", "mute_ui", 0 ],
			"obj-1::obj-1::obj-4::obj-8" : [ "end_ui[28]", "end_ui", 0 ],
			"obj-2::obj-1::obj-4::obj-1" : [ "start_ui[20]", "start_ui", 0 ],
			"obj-2::obj-1::obj-2::obj-24" : [ "end[22]", "end", 0 ],
			"obj-4::obj-1::obj-8::obj-1" : [ "start_ui", "start_ui", 0 ],
			"obj-1::obj-1::obj-1::obj-2" : [ "steps[31]", "steps", 0 ],
			"obj-2::obj-1::obj-5::obj-7" : [ "mute_ui[22]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-8::obj-1" : [ "start_ui[16]", "start_ui", 0 ],
			"obj-2::obj-8" : [ "multiplier[2]", "multiplier", 0 ],
			"obj-2::obj-5" : [ "pitch[2]", "pitch", 0 ],
			"obj-4::obj-1::obj-8::obj-22" : [ "start", "start", 0 ],
			"obj-4::obj-1::obj-1::obj-24" : [ "end[7]", "end", 0 ],
			"obj-3::obj-1::obj-6::obj-1" : [ "start_ui[10]", "start_ui", 0 ],
			"obj-3::obj-1::obj-5::obj-1" : [ "start_ui[11]", "start_ui", 0 ],
			"obj-1::obj-1::obj-2::obj-8" : [ "end_ui[30]", "end_ui", 0 ],
			"obj-2::obj-1::obj-7::obj-1" : [ "start_ui[17]", "start_ui", 0 ],
			"obj-3::obj-1::obj-1::obj-2" : [ "steps[15]", "steps", 0 ],
			"obj-1::obj-1::obj-6::obj-8" : [ "end_ui[26]", "end_ui", 0 ],
			"obj-4::obj-1::obj-7::obj-22" : [ "start[1]", "start", 0 ],
			"obj-4::obj-1::obj-3::obj-24" : [ "end[5]", "end", 0 ],
			"obj-4::obj-17" : [ "mute_ui[11]", "mute_ui", 0 ],
			"obj-1::obj-1::obj-7::obj-33" : [ "mute[28]", "mute", 0 ],
			"obj-1::obj-1::obj-7::obj-24" : [ "end[25]", "end", 0 ],
			"obj-3::obj-1::obj-7::obj-33" : [ "mute[8]", "mute", 0 ],
			"obj-4::obj-1::obj-8::obj-2" : [ "steps", "steps", 0 ],
			"obj-4::obj-1::obj-5::obj-8" : [ "end_ui[3]", "end_ui", 0 ],
			"obj-1::obj-1::obj-4::obj-1" : [ "start_ui[28]", "start_ui", 0 ],
			"obj-1::obj-7" : [ "gate[3]", "gate", 0 ],
			"obj-2::obj-1::obj-3::obj-33" : [ "mute[23]", "mute", 0 ],
			"obj-3::obj-1::obj-8::obj-33" : [ "mute[17]", "mute", 0 ],
			"obj-3::obj-1::obj-5::obj-22" : [ "start[11]", "start", 0 ],
			"obj-3::obj-1::obj-5::obj-2" : [ "steps[11]", "steps", 0 ],
			"obj-3::obj-1::obj-4::obj-1" : [ "start_ui[12]", "start_ui", 0 ],
			"obj-4::obj-1::obj-5::obj-22" : [ "start[3]", "start", 0 ],
			"obj-1::obj-1::obj-4::obj-22" : [ "start[28]", "start", 0 ],
			"obj-1::obj-1::obj-3::obj-22" : [ "start[29]", "start", 0 ],
			"obj-2::obj-1::obj-6::obj-7" : [ "mute_ui[21]", "mute_ui", 0 ],
			"obj-1::obj-1::obj-8::obj-22" : [ "start[24]", "start", 0 ],
			"obj-2::obj-1::obj-5::obj-33" : [ "mute[21]", "mute", 0 ],
			"obj-2::obj-1::obj-5::obj-8" : [ "end_ui[19]", "end_ui", 0 ],
			"obj-4::obj-1::obj-5::obj-24" : [ "end[3]", "end", 0 ],
			"obj-4::obj-1::obj-2::obj-33" : [ "mute[6]", "mute", 0 ],
			"obj-1::obj-1::obj-8::obj-33" : [ "mute[27]", "mute", 0 ],
			"obj-1::obj-1::obj-5::obj-33" : [ "mute[30]", "mute", 0 ],
			"obj-1::obj-1::obj-5::obj-1" : [ "start_ui[27]", "start_ui", 0 ],
			"obj-2::obj-1::obj-2::obj-8" : [ "end_ui[22]", "end_ui", 0 ],
			"obj-3::obj-1::obj-5::obj-33" : [ "mute[10]", "mute", 0 ],
			"obj-1::obj-1::obj-3::obj-1" : [ "start_ui[29]", "start_ui", 0 ],
			"obj-1::obj-1::obj-1::obj-7" : [ "mute_ui[35]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-8::obj-33" : [ "mute[18]", "mute", 0 ],
			"obj-3::obj-6" : [ "velocity[1]", "velocity", 0 ],
			"obj-4::obj-1::obj-4::obj-8" : [ "end_ui[4]", "end_ui", 0 ],
			"obj-4::obj-1::obj-4::obj-2" : [ "steps[4]", "steps", 0 ],
			"obj-1::obj-1::obj-5::obj-2" : [ "steps[27]", "steps", 0 ],
			"obj-1::obj-1::obj-1::obj-22" : [ "start[31]", "start", 0 ],
			"obj-2::obj-1::obj-3::obj-8" : [ "end_ui[21]", "end_ui", 0 ],
			"obj-2::obj-1::obj-1::obj-2" : [ "steps[23]", "steps", 0 ],
			"obj-1::obj-1::obj-3::obj-33" : [ "mute[32]", "mute", 0 ],
			"obj-2::obj-1::obj-4::obj-7" : [ "mute_ui[23]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-2::obj-1" : [ "start_ui[22]", "start_ui", 0 ],
			"obj-4::obj-1::obj-6::obj-33" : [ "mute[2]", "mute", 0 ],
			"obj-1::obj-1::obj-8::obj-2" : [ "steps[24]", "steps", 0 ],
			"obj-1::obj-1::obj-2::obj-22" : [ "start[30]", "start", 0 ],
			"obj-2::obj-1::obj-7::obj-8" : [ "end_ui[17]", "end_ui", 0 ],
			"obj-2::obj-1::obj-1::obj-8" : [ "end_ui[23]", "end_ui", 0 ],
			"obj-3::obj-1::obj-7::obj-7" : [ "mute_ui[9]", "mute_ui", 0 ],
			"obj-3::obj-1::obj-7::obj-2" : [ "steps[9]", "steps", 0 ],
			"obj-4::obj-1::obj-1::obj-22" : [ "start[7]", "start", 0 ],
			"obj-2::obj-17" : [ "mute_ui[27]", "mute_ui", 0 ],
			"obj-4::obj-8" : [ "multiplier", "multiplier", 0 ],
			"obj-1::obj-1::obj-4::obj-7" : [ "mute_ui[32]", "mute_ui", 0 ],
			"obj-3::obj-1::obj-3::obj-33" : [ "mute[12]", "mute", 0 ],
			"obj-1::obj-1::obj-1::obj-33" : [ "mute[34]", "mute", 0 ],
			"obj-2::obj-1::obj-6::obj-33" : [ "mute[20]", "mute", 0 ],
			"obj-2::obj-1::obj-1::obj-7" : [ "mute_ui[26]", "mute_ui", 0 ],
			"obj-4::obj-1::obj-6::obj-2" : [ "steps[2]", "steps", 0 ],
			"obj-4::obj-1::obj-3::obj-22" : [ "start[5]", "start", 0 ],
			"obj-4::obj-1::obj-1::obj-8" : [ "end_ui[7]", "end_ui", 0 ],
			"obj-1::obj-1::obj-7::obj-22" : [ "start[25]", "start", 0 ],
			"obj-1::obj-1::obj-5::obj-24" : [ "end[27]", "end", 0 ],
			"obj-1::obj-1::obj-4::obj-24" : [ "end[28]", "end", 0 ],
			"obj-1::obj-1::obj-2::obj-33" : [ "mute[33]", "mute", 0 ],
			"obj-1::obj-1::obj-2::obj-7" : [ "mute_ui[34]", "mute_ui", 0 ],
			"obj-3::obj-1::obj-6::obj-7" : [ "mute_ui[12]", "mute_ui", 0 ],
			"obj-1::obj-1::obj-4::obj-2" : [ "steps[28]", "steps", 0 ],
			"obj-1::obj-1::obj-3::obj-2" : [ "steps[29]", "steps", 0 ],
			"obj-2::obj-1::obj-1::obj-1" : [ "start_ui[23]", "start_ui", 0 ],
			"obj-4::obj-1::obj-8::obj-7" : [ "mute_ui", "mute_ui", 0 ],
			"obj-4::obj-1::obj-6::obj-1" : [ "start_ui[2]", "start_ui", 0 ],
			"obj-1::obj-1::obj-7::obj-7" : [ "mute_ui[29]", "mute_ui", 0 ],
			"obj-1::obj-6" : [ "velocity[3]", "velocity", 0 ],
			"obj-2::obj-1::obj-7::obj-7" : [ "mute_ui[20]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-6::obj-8" : [ "end_ui[18]", "end_ui", 0 ],
			"obj-3::obj-1::obj-1::obj-8" : [ "end_ui[15]", "end_ui", 0 ],
			"obj-1::obj-1::obj-5::obj-22" : [ "start[27]", "start", 0 ],
			"obj-1::obj-1::obj-1::obj-8" : [ "end_ui[31]", "end_ui", 0 ],
			"obj-3::obj-1::obj-4::obj-8" : [ "end_ui[12]", "end_ui", 0 ],
			"obj-3::obj-1::obj-1::obj-24" : [ "end[15]", "end", 0 ],
			"obj-4::obj-1::obj-6::obj-7" : [ "mute_ui[2]", "mute_ui", 0 ],
			"obj-4::obj-7" : [ "gate", "gate", 0 ],
			"obj-3::obj-1::obj-3::obj-7" : [ "mute_ui[15]", "mute_ui", 0 ],
			"obj-4::obj-1::obj-1::obj-33" : [ "mute[7]", "mute", 0 ],
			"obj-1::obj-1::obj-7::obj-1" : [ "start_ui[25]", "start_ui", 0 ],
			"obj-2::obj-1::obj-8::obj-2" : [ "steps[16]", "steps", 0 ],
			"obj-2::obj-1::obj-4::obj-2" : [ "steps[20]", "steps", 0 ],
			"obj-1::obj-1::obj-8::obj-24" : [ "end[24]", "end", 0 ],
			"obj-1::obj-1::obj-3::obj-7" : [ "mute_ui[33]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-1::obj-33" : [ "mute[25]", "mute", 0 ],
			"obj-2::obj-1::obj-1::obj-22" : [ "start[23]", "start", 0 ],
			"obj-3::obj-1::obj-8::obj-22" : [ "start[8]", "start", 0 ],
			"obj-3::obj-1::obj-8::obj-1" : [ "start_ui[8]", "start_ui", 0 ],
			"obj-3::obj-1::obj-3::obj-8" : [ "end_ui[13]", "end_ui", 0 ],
			"obj-3::obj-8" : [ "multiplier[1]", "multiplier", 0 ],
			"obj-3::obj-5" : [ "pitch[1]", "pitch", 0 ],
			"obj-4::obj-1::obj-4::obj-24" : [ "end[4]", "end", 0 ],
			"obj-4::obj-1::obj-3::obj-1" : [ "start_ui[5]", "start_ui", 0 ],
			"obj-1::obj-1::obj-6::obj-22" : [ "start[26]", "start", 0 ],
			"obj-1::obj-1::obj-5::obj-7" : [ "mute_ui[31]", "mute_ui", 0 ],
			"obj-1::obj-1::obj-2::obj-2" : [ "steps[30]", "steps", 0 ],
			"obj-1::obj-33" : [ "mute[35]", "mute", 0 ],
			"obj-2::obj-1::obj-8::obj-8" : [ "end_ui[16]", "end_ui", 0 ],
			"obj-3::obj-1::obj-8::obj-2" : [ "steps[8]", "steps", 0 ],
			"obj-3::obj-1::obj-7::obj-1" : [ "start_ui[9]", "start_ui", 0 ],
			"obj-3::obj-1::obj-6::obj-33" : [ "mute[9]", "mute", 0 ],
			"obj-1::obj-1::obj-7::obj-8" : [ "end_ui[25]", "end_ui", 0 ],
			"obj-1::obj-1::obj-5::obj-8" : [ "end_ui[27]", "end_ui", 0 ],
			"obj-2::obj-1::obj-3::obj-24" : [ "end[21]", "end", 0 ],
			"obj-4::obj-1::obj-3::obj-2" : [ "steps[5]", "steps", 0 ],
			"obj-4::obj-1::obj-2::obj-7" : [ "mute_ui[6]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-4::obj-8" : [ "end_ui[20]", "end_ui", 0 ],
			"obj-3::obj-1::obj-3::obj-24" : [ "end[13]", "end", 0 ],
			"obj-3::obj-1::obj-1::obj-33" : [ "mute[14]", "mute", 0 ],
			"obj-4::obj-1::obj-6::obj-8" : [ "end_ui[2]", "end_ui", 0 ],
			"obj-1::obj-1::obj-6::obj-1" : [ "start_ui[26]", "start_ui", 0 ],
			"obj-2::obj-1::obj-7::obj-24" : [ "end[17]", "end", 0 ],
			"obj-2::obj-7" : [ "gate[2]", "gate", 0 ],
			"obj-3::obj-1::obj-2::obj-1" : [ "start_ui[14]", "start_ui", 0 ],
			"obj-4::obj-1::obj-6::obj-22" : [ "start[2]", "start", 0 ],
			"obj-4::obj-1::obj-2::obj-1" : [ "start_ui[6]", "start_ui", 0 ],
			"obj-4::obj-1::obj-2::obj-2" : [ "steps[6]", "steps", 0 ],
			"obj-1::obj-1::obj-6::obj-2" : [ "steps[26]", "steps", 0 ],
			"obj-2::obj-1::obj-7::obj-2" : [ "steps[17]", "steps", 0 ],
			"obj-2::obj-1::obj-5::obj-24" : [ "end[19]", "end", 0 ],
			"obj-3::obj-1::obj-1::obj-22" : [ "start[15]", "start", 0 ],
			"obj-4::obj-1::obj-3::obj-7" : [ "mute_ui[5]", "mute_ui", 0 ],
			"obj-4::obj-1::obj-1::obj-1" : [ "start_ui[7]", "start_ui", 0 ],
			"obj-1::obj-1::obj-6::obj-33" : [ "mute[29]", "mute", 0 ],
			"obj-1::obj-1::obj-6::obj-24" : [ "end[26]", "end", 0 ],
			"obj-4::obj-1::obj-1::obj-7" : [ "mute_ui[7]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-2::obj-2" : [ "steps[22]", "steps", 0 ],
			"obj-3::obj-1::obj-3::obj-2" : [ "steps[13]", "steps", 0 ],
			"obj-3::obj-1::obj-1::obj-1" : [ "start_ui[15]", "start_ui", 0 ],
			"obj-3::obj-17" : [ "mute_ui[18]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-4::obj-22" : [ "start[20]", "start", 0 ],
			"obj-2::obj-1::obj-3::obj-7" : [ "mute_ui[24]", "mute_ui", 0 ],
			"obj-3::obj-1::obj-5::obj-8" : [ "end_ui[11]", "end_ui", 0 ],
			"obj-3::obj-1::obj-2::obj-2" : [ "steps[14]", "steps", 0 ],
			"obj-1::obj-8" : [ "multiplier[3]", "multiplier", 0 ],
			"obj-1::obj-5" : [ "pitch[3]", "pitch", 0 ],
			"obj-2::obj-1::obj-1::obj-24" : [ "end[23]", "end", 0 ],
			"obj-3::obj-1::obj-8::obj-24" : [ "end[8]", "end", 0 ],
			"obj-3::obj-1::obj-2::obj-24" : [ "end[14]", "end", 0 ],
			"obj-2::obj-1::obj-3::obj-1" : [ "start_ui[21]", "start_ui", 0 ],
			"obj-4::obj-1::obj-7::obj-33" : [ "mute[1]", "mute", 0 ],
			"obj-4::obj-33" : [ "mute[16]", "mute", 0 ],
			"obj-1::obj-1::obj-8::obj-1" : [ "start_ui[24]", "start_ui", 0 ],
			"obj-1::obj-1::obj-7::obj-2" : [ "steps[25]", "steps", 0 ],
			"obj-3::obj-1::obj-4::obj-2" : [ "steps[12]", "steps", 0 ],
			"obj-4::obj-5" : [ "pitch", "pitch", 0 ],
			"obj-2::obj-1::obj-7::obj-22" : [ "start[17]", "start", 0 ],
			"obj-3::obj-1::obj-6::obj-24" : [ "end[10]", "end", 0 ],
			"obj-3::obj-1::obj-4::obj-7" : [ "mute_ui[14]", "mute_ui", 0 ],
			"obj-4::obj-1::obj-4::obj-22" : [ "start[4]", "start", 0 ],
			"obj-1::obj-1::obj-6::obj-7" : [ "mute_ui[30]", "mute_ui", 0 ],
			"obj-1::obj-1::obj-4::obj-33" : [ "mute[31]", "mute", 0 ],
			"obj-2::obj-1::obj-5::obj-1" : [ "start_ui[19]", "start_ui", 0 ],
			"obj-3::obj-1::obj-2::obj-7" : [ "mute_ui[16]", "mute_ui", 0 ],
			"obj-3::obj-33" : [ "mute[15]", "mute", 0 ],
			"obj-4::obj-1::obj-3::obj-8" : [ "end_ui[5]", "end_ui", 0 ],
			"obj-1::obj-1::obj-8::obj-7" : [ "mute_ui[28]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-3::obj-22" : [ "start[21]", "start", 0 ],
			"obj-4::obj-1::obj-7::obj-2" : [ "steps[1]", "steps", 0 ],
			"obj-1::obj-17" : [ "mute_ui[36]", "mute_ui", 0 ],
			"obj-2::obj-1::obj-8::obj-22" : [ "start[16]", "start", 0 ],
			"obj-3::obj-1::obj-3::obj-22" : [ "start[13]", "start", 0 ],
			"obj-2::obj-1::obj-6::obj-22" : [ "start[18]", "start", 0 ],
			"obj-3::obj-1::obj-4::obj-33" : [ "mute[11]", "mute", 0 ],
			"obj-4::obj-1::obj-2::obj-24" : [ "end[6]", "end", 0 ],
			"obj-2::obj-1::obj-7::obj-33" : [ "mute[19]", "mute", 0 ],
			"obj-2::obj-1::obj-5::obj-22" : [ "start[19]", "start", 0 ],
			"obj-2::obj-33" : [ "mute[26]", "mute", 0 ],
			"obj-4::obj-1::obj-7::obj-1" : [ "start_ui[1]", "start_ui", 0 ],
			"obj-1::obj-1::obj-3::obj-24" : [ "end[29]", "end", 0 ],
			"obj-2::obj-6" : [ "velocity[2]", "velocity", 0 ],
			"obj-3::obj-1::obj-8::obj-8" : [ "end_ui[8]", "end_ui", 0 ],
			"obj-3::obj-1::obj-7::obj-22" : [ "start[9]", "start", 0 ],
			"obj-3::obj-1::obj-4::obj-22" : [ "start[12]", "start", 0 ],
			"obj-4::obj-1::obj-1::obj-2" : [ "steps[7]", "steps", 0 ],
			"obj-2::obj-1::obj-4::obj-24" : [ "end[20]", "end", 0 ],
			"obj-4::obj-1::obj-7::obj-7" : [ "mute_ui[1]", "mute_ui", 0 ],
			"obj-4::obj-1::obj-2::obj-8" : [ "end_ui[6]", "end_ui", 0 ],
			"obj-2::obj-1::obj-6::obj-1" : [ "start_ui[18]", "start_ui", 0 ],
			"obj-2::obj-1::obj-4::obj-33" : [ "mute[22]", "mute", 0 ],
			"obj-3::obj-1::obj-8::obj-7" : [ "mute_ui[8]", "mute_ui", 0 ],
			"obj-3::obj-1::obj-2::obj-33" : [ "mute[13]", "mute", 0 ],
			"obj-4::obj-1::obj-8::obj-33" : [ "mute", "mute", 0 ],
			"obj-4::obj-1::obj-4::obj-33" : [ "mute[4]", "mute", 0 ],
			"obj-2::obj-1::obj-2::obj-22" : [ "start[22]", "start", 0 ],
			"obj-3::obj-1::obj-7::obj-8" : [ "end_ui[9]", "end_ui", 0 ],
			"obj-3::obj-1::obj-6::obj-2" : [ "steps[10]", "steps", 0 ],
			"obj-3::obj-1::obj-3::obj-1" : [ "start_ui[13]", "start_ui", 0 ],
			"obj-4::obj-1::obj-8::obj-24" : [ "end", "end", 0 ],
			"obj-4::obj-1::obj-5::obj-33" : [ "mute[3]", "mute", 0 ],
			"obj-3::obj-1::obj-5::obj-7" : [ "mute_ui[13]", "mute_ui", 0 ],
			"obj-3::obj-1::obj-2::obj-22" : [ "start[14]", "start", 0 ],
			"obj-3::obj-1::obj-1::obj-7" : [ "mute_ui[17]", "mute_ui", 0 ],
			"obj-4::obj-6" : [ "velocity", "velocity", 0 ],
			"obj-4::obj-1::obj-6::obj-24" : [ "end[2]", "end", 0 ],
			"obj-4::obj-1::obj-5::obj-1" : [ "start_ui[3]", "start_ui", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "track.maxpat",
				"bootpath" : "D:/workspace/Max/Max-for-Live/m4l-launchpad-sequencer/launchpad-sequencer/launchpad-sequencer-device-project",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "patterns.maxpat",
				"bootpath" : "D:/workspace/Max/Max-for-Live/m4l-launchpad-sequencer/launchpad-sequencer/launchpad-sequencer-device-project",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "pattern.maxpat",
				"bootpath" : "D:/workspace/Max/Max-for-Live/m4l-launchpad-sequencer/launchpad-sequencer/launchpad-sequencer-device-project",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
